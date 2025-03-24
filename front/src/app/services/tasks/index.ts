import { create } from "./create";
import { remove } from './delete';
import { getAll } from "./getAll";
import { update } from './update';
import { updateStatus } from './updateStatus';

export const tasksService = {
  create,
  getAll,
  update,
  remove,
  updateStatus,
};
