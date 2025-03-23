import { Request, Response } from "express";
import { prisma } from 'src/config/prisma';

interface TaskQueryInterface {
  status?: "active" | "done";
}

export async function listTasks(
  req: Request<{}, {}, {}, TaskQueryInterface>,
  res: Response
) {
  try {
    const { status } = req.query;
    const userId = req.user?.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status,
      },
    });

    res.json(tasks);
  } catch (err) {
    res.sendStatus(500);
  }
}
