import { Request, Response } from "express";

import { prisma } from "src/config/prisma";
export async function me(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error);
    res.sendStatus(500);
  }
}
