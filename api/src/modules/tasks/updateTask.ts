import { Request, Response } from "express";
import { prisma } from 'src/config/prisma';

export async function updateTask(req: Request, res: Response) {
  try {
    const { description, title } = req.body;
    const { taskId } = req.params;

    const userId = req.user?.id;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    const isOwner = task?.userId === userId;
    if (!isOwner) {
      res.sendStatus(403);
      return;
    }
    await prisma.task.update({
      where: { id: taskId },

      data: {
        description,
        title,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.log("🚀 ~ updateTask ~ error:", error);
    res.sendStatus(500);
  }
}
