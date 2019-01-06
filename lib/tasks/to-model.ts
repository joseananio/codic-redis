import { TaskModel } from "../decs";

export default function toModel(task): TaskModel {
  let { name, definition, id, config } = task;
  const tm: TaskModel = {
    id: id,
    name,
    definition,
    config
  };
  return tm;
}
