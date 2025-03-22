import { prisma } from '../../../prisma';
export async function updateTaskStatus(req, res) {
    try {
        const { taskId } = req.params;
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });
        const newTask = task?.status === 'active' ? 'done' : 'active';
        await prisma.task.update({
            data: {
                status: newTask,
            },
            where: { id: taskId },
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(500);
    }
}
