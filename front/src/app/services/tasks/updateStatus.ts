import { httpClient } from "../httpClient";


export async function updateStatus(taskId: string) {
  const { data } = await httpClient.put(`/tasks/status/${taskId}`);

  return data;
}
