import { db } from "../db/index.js";
import { designs } from "../db/schema.js";


export const createDesign = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? `/uploads/designs/${req.file.filename}` : null;

    const inserted = await db.insert(designs).values({
      name,
      price,
      category,
      image,
    }).returning();

    res.json({ success: true, data: inserted[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDesigns = async (req, res) => {
  const data = await db.select().from(designs);
  res.json({ success: true, data });
};


export const getDesign = async (req, res) => {
  const id = Number(req.params.id);
  const data = await db.select().from(designs).where(eq(designs.id, id));
  res.json({ success: true, data: data[0] });
};


export const updateDesign = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, category } = req.body;

    let updateData = { name, price, category };

    if (req.file) {
      updateData.image = `/uploads/designs/${req.file.filename}`;
    }

    const updated = await db.update(designs)
      .set(updateData)
      .where(eq(designs.id, id))
      .returning();

    res.json({ success: true, data: updated[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteDesign = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await db.delete(designs).where(eq(designs.id, id));

    res.json({ success: true, message: "Design deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

