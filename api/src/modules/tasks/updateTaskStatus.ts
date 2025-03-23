import { Request, Response } from "express";
import { prisma } from 'src/config/prisma';

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const userId = req.user?.id;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    const isOwner = task?.userId === userId;
    if (!isOwner) {
      res.sendStatus(403);
      return;
    }

    const newTask = task?.status === "active" ? "done" : "active";

    await prisma.task.update({
      data: {
        status: newTask,
      },
      where: { id: taskId },
    });

    res.sendStatus(204);
  } catch (error) {
    console.log("🚀 ~ updateTaskStatus ~ error:", error);
    res.sendStatus(500);
  }
}
