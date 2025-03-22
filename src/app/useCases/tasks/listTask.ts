import { prisma } from "../../../prisma";
import { Request, Response } from "express";

interface TaskQueryInterface {
  status?: "active" | "done";
}

export async function listTasks(
  req: Request<{}, {}, {}, TaskQueryInterface>,
  res: Response
) {
  try {
    const { status } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        status,
      },
    });

    res.json(tasks);
  } catch (err) {
    res.sendStatus(500);
  }
}
