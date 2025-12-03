import express from "express";
import {
  createDesign,
  getDesigns,
  getDesign,
  updateDesign,
  deleteDesign,
} from "../controller/designController.js";

import { uploadDesignImage } from "../middleware/upload.js";

const router = express.Router();

router.post("/", uploadDesignImage.single("image"), createDesign);
router.get("/", getDesigns);
router.get("/:id", getDesign);
router.put("/:id", uploadDesignImage.single("image"), updateDesign);
router.delete("/:id", deleteDesign);

export default router;
