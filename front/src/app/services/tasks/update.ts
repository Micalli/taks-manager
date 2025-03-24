import { httpClient } from "../httpClient";

export interface UpdateTasksParams {
  id: string;
  title: string;

}

export async function update({ id, title }: UpdateTasksParams) {
  const { data } = await httpClient.put(`/tasks/${id}`, {title});

  return data;
}
