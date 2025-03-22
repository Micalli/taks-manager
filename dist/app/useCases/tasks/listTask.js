import { prisma } from "../../../prisma";
export async function listTasks(req, res) {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    }
    catch (err) {
        res.sendStatus(500);
    }
}
