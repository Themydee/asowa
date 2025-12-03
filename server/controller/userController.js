import { db } from '../db.js';
import { users } from '../db/schema.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await db.select()
      .from(users)
      .orderBy(users.id); 

    res.json({ success: true, users: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An unexpected error occurred." });
  }
};