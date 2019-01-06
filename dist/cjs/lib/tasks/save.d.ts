import { TaskModel } from "../decs";
interface saveFunc {
    (task: TaskModel): Promise<TaskModel>;
}
/**
 * Save task into database
 * Updates if name exists
 * @param {TaskModel} task task model object
 * @returns Promise<TaskModel>
 */
declare let save: saveFunc;
export default save;
