import { ActivityModel } from "../decs";
interface saveFunc {
    (activity: ActivityModel): Promise<ActivityModel>;
}
/**
 * Save activity into redis db
 * Updates if name exists
 * @param {ActivityModel} activity activity model object
 * @returns Promise<ActivityModel>
 */
declare let save: saveFunc;
export default save;
