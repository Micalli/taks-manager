import { Request, Response } from "express";
import { prisma } from '../../../prisma';

export async function updateTask(req: Request, res: Response) {

  try {
    const {description, title} = req.body;
    const { taskId } = req.params;

    await prisma.task.update({
      where: { id: taskId },

      data: {
        description,
        title,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.log("🚀 ~ updateTask ~ error:", error)
    res.sendStatus(500);
  }
}
