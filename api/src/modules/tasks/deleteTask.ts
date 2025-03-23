import { Request, Response } from "express";
import { prisma } from 'src/config/prisma';

export async function deleteTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const userId =  req.user?.id;


    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    const isOwner = task?.userId === userId;

    if (!isOwner) {
      res.sendStatus(403);
      return;
    }
    await prisma.task.delete({
      where: { id: taskId },
    });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
