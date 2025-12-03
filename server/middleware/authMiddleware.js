import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db.js'; // your Drizzle client
import { users } from '../db/schema.js'; // your users table

// Protect routes middleware
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET not defined");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, decoded.id))
        .limit(1);

      if (!user || user.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized, user not found" });
      }

      req.user = user[0];
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};


// Admin middleware
export const admin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Not authorized as an admin' });
  }
};
