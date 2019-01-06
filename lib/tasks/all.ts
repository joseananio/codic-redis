import { TaskModel } from "../decs";
import toModel from "./to-model";

/**
 * Returns a list of all tasks
 * @returns Promise<Array<TaskModel>>
 */
export default async function all(): Promise<Array<TaskModel>> {
  var res = await this.getRawTasks();
  var tasks = res.map(toModel);
  return tasks;
}
