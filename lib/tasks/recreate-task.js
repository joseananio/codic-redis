import Codic from "../../../sched";

export default function recreateTask(task) {
  let { name, definition, ...config } = task;
  return new Codic.Task(name, config, definition);
}
