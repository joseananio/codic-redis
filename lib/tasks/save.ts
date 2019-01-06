import { TaskModel } from "../decs";
import JSONfn from "../utils/to-from-json";
import toModel from "./to-model";

interface saveFunc {
  (task: TaskModel): Promise<TaskModel>;
}

/**
 * Save task into database
 * Updates if name exists
 * @param {TaskModel} task task model object
 * @returns Promise<TaskModel>
 */
let save: saveFunc = async function(task) {
  var exists = false;
  var tasks = await this.getRawTasks();
  tasks.forEach(function(_task, key) {
    if (_task.name === task.name) {
      tasks[key] = task;
      exists = true;
    }
  });

  if (!exists) {
    task.id = this.makeId();
    tasks.push(task);
  }
  await this.db.set(this.keyBase + ":tasks", JSONfn.stringify(tasks));
  return toModel(task);
};

export default save;
