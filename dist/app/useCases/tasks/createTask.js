import { prisma } from "../../../prisma";
export async function createCategory(req, res) {
    try {
        const { title, description } = req.body;
        const task = await prisma.task.create({
            data: { title, description },
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.sendStatus(500);
    }
}
