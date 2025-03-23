import { Request, Response } from "express";
import { prisma } from 'src/config/prisma';


export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const task = await prisma.task.create({
      data: { title, description, userId },
    });

    res.status(201).json(task);
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error)
    res.sendStatus(500);
  }
}
