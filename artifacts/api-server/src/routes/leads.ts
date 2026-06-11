import { Router } from "express";

const router = Router();

const leads: Array<{ id: number; name: string; email: string; createdAt: string }> = [];

router.post("/leads", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nome e e-mail são obrigatórios." });
  }

  const lead = {
    id: leads.length + 1,
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  leads.push(lead);
  res.status(201).json(lead);
});

export default router;
