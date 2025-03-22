import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: { title, description },
    });

    res.status(201).json(task);
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error)
    res.sendStatus(500);
  }
}
