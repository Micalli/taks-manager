import { Request, Response } from "express";
import {hash} from "bcryptjs";


import { generateAccessToken } from '../services/authService';
import { prisma } from 'src/config/prisma';
export async function singup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const accessToken = await generateAccessToken(user.id);

    res.status(201).json({accessToken});
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error);
    res.sendStatus(500);
  }
}
