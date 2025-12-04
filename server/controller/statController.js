
import { db } from "../db.js";
import { users } from "../db/schema.js";
import { sql } from "drizzle-orm";

export const getStats = async (req, res) => {
  try {
    const totalUsersResult = await db
      .select({ count: sql`count(*)` })
      .from(users);

    const totalUsers = Number(totalUsersResult[0].count);

    // You can add more stats later: total designs, total sales, etc.
    res.json({ totalUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
