import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { generateAccessToken } from '../services/authService';
import { prisma } from 'src/config/prisma';
export async function singin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas1" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const accessToken = await generateAccessToken(user.id);

    res.status(201).json({ accessToken });
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error);
    res.sendStatus(500);
  }
}
