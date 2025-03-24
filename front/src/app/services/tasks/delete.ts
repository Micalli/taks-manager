import { httpClient } from "../httpClient";

export async function remove(taskId: string) {
  const { data } = await httpClient.delete(`/tasks/${taskId}`);

  return data;
}
