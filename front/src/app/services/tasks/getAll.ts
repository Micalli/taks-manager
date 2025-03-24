import { httpClient } from "../httpClient";

type TaskResponse = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}[];

export async function getAll(status?: "active" | "done") {
  console.log("🚀 ~ getAll ~ status:", status)
  const { data } = await httpClient.get<TaskResponse>("/tasks", {
    params: status ? { status } : {},
  });

  return data;
}
