import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid" });
  }

  const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!match) return res.status(401).json({ error: "Invalid" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

export default router;