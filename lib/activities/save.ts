import { ActivityModel } from "../decs";
import JSONfn from "../utils/to-from-json";

interface saveFunc {
  (activity: ActivityModel): Promise<ActivityModel>;
}

/**
 * Save activity into redis db
 * Updates if name exists
 * @param {ActivityModel} activity activity model object
 * @returns Promise<ActivityModel>
 */
let save: saveFunc = async function(activity: ActivityModel) {
  var exists = false;
  delete activity.driver;
  var activities = await this.getRawActivities();

  activities.forEach(function(_activity: ActivityModel, key: number) {
    if (activity._name && _activity._name === activity._name) {
      activities[key] = activity;
      exists = true;
    }
  });

  if (!exists) {
    activity.id = this.makeId();
    activities.push(activity);
  }

  await this.driver.db.set(this.storageKey, JSONfn.stringify(activities));
  return this.toModel(activity);
};

export default save;
