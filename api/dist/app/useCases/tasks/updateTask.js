import { prisma } from '../../../prisma';
export async function updateTask(req, res) {
    try {
        const { description, title } = req.body;
        const { taskId } = req.params;
        await prisma.task.update({
            data: {
                description,
                title,
            },
            where: { id: taskId },
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(500);
    }
}
