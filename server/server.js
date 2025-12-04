import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./db/index.js"
import path from "path"

import authRoute from "./routes/authRoute.js"
import designRoute from "./routes/designRoute.js"
import userRoute from "./routes/userRoute.js"
import statRoute from "./routes/statRoute.js"




dotenv.config()

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }));

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Asowa API is running...")
})

app.use("/api/auth", authRoute);
app.use("/api/designs", designRoute);
app.use("/api/users", userRoute);
app.use("/api/stats", statRoute);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
   try {
    await db.execute(`SELECT 1`);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }

  console.log(`🚀 Server running on port ${PORT}`);
})