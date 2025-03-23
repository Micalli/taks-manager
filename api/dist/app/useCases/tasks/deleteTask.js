import { prisma } from '../../../prisma';
export async function deleteTask(req, res) {
    try {
        const { taskId } = req.params;
        await prisma.task.delete({
            where: { id: taskId },
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(500);
    }
}
