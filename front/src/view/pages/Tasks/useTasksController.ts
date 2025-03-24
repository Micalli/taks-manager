import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../../../app/services/tasks";
import { CreateTaskParams } from "../../../app/services/tasks/create";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTasks } from "../../../app/hooks/useTasks";
import { UpdateTasksParams } from "../../../app/services/tasks/update";

export function useTasksController() {
  const [selectedFilter, setSelectedFilter] =
    useState<{ status?: "active" | "done" }["status"]>(undefined);

  const [newTask, setNewTask] = useState("");

  const { isFetching, tasks } = useTasks(selectedFilter);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTaskParams) => {
      return tasksService.create(data);
    },
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: async (data: UpdateTasksParams) => {
      return tasksService.update(data);
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: async (taskId: string) => {
      return tasksService.remove(taskId);
    },
  });

  const { mutateAsync: updateStatusTask } = useMutation({
    mutationFn: async (taskId: string) => {
      return tasksService.updateStatus(taskId);
    },
  });

  async function handleSubmit(title: string) {
    try {
      await mutateAsync({ title });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa criada com sucesso!");
    } catch {
      toast.error("Erro ao criar tarefa!");
    }
  }
  function handleChangeNewTask(title: string) {
    setNewTask(title);
  }
  function handleChangeFilter(status?: "active" | "done") {
    setSelectedFilter(status);
  }

  async function handleEditTask(id: string, newTitle: string) {
    console.log("🚀 ~ handleEditTask ~ newTitle:", newTitle);
    try {
      await updateTask({ id, title: newTitle });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa editada com sucesso!");
    } catch {
      toast.error("Erro ao editar tarefa!");
    }
  }
  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa deletada com sucesso!");
    } catch {
      toast.error("Erro ao deletar tarefa!");
    }
  }

  async function handleToggleTask(id: string) {
    try {
      await updateStatusTask(id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa atualizada com sucesso!");
    } catch {
      toast.error("Erro ao atualizar tarefa!");
    }
  }

  return {
    selectedFilter,
    isPending,
    handleSubmit,
    newTask,
    handleChangeNewTask,
    tasks,
    isFetching,
    handleChangeFilter,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
  };
}
