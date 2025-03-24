import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../services/tasks";

export function useTasks(status?: "active" | "done") {
  console.log("🚀 ~ useTasks ~ status:", status)
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => tasksService.getAll(status),
    staleTime: Infinity
  });

  return { tasks: data ?? [], refetch, isFetching };
}
