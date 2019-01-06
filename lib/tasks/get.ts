import { TaskModel } from "../decs";
import toModel from "./to-model";

/**
 * Get a single task by name
 * @param {string} name name of task
 * @returns Promise<TaskModel>
 */
export async function get(name: string): Promise<TaskModel> {
  var tasks = await this.getRawTasks();
  var task = tasks.find(task => task.name === name);
  return task ? toModel(task) : null;
}

/**
 * Get a single task by id
 * The task should have been saved in the driver first
 * Not yet available in memory
 * @param {string} id id of task
 * @returns Promise<TaskModel>
 */
export async function getById(id: string | number): Promise<TaskModel> {
  var tasks = await this.getRawTasks();
  var task = tasks.find(task => task.id === id);
  return task ? toModel(task) : null;
}
