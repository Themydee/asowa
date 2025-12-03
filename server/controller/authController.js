import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { users } from "../db/schema.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";


export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const existingUser = await db.select().from(users).where(eq(users.email, email));
        if( existingUser.length > 0 ) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.insert(users).values({
            fullname,
            email,
            password: hashedPassword,
            role: "user",
        }).returning();

        const token = jwt.sign(
            {id: Number(newUser[0].id), email: newUser[0].email, role: newUser[0].role},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.status(201).json({ success: true, user: newUser[0],token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if( existingUser.length === 0 ) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = existingUser[0];
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(200).json({ success: false, message: "Invalid email or password"});
    }

    const token = jwt.sign(
        {
            id: Number(user.id),
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.status(200).json({ 
        success: true, 
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
        }, 
        token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}