import { ActivityModel } from "../decs";

/**
 * Get a single activity by name
 * @param {string} name name of activity
 * @returns Promise<ActivityModel>
 */
export async function get(name: string): Promise<ActivityModel> {
  var list = await this.getRawActivities();
  var item = list.find(item => item._name === name);
  return item ? this.toModel(item) : null;
}

/**
 * Get a single activity by id
 * The activity should have been saved in the driver first
 * Not yet available in memory
 * @param {string} id id of activity
 * @returns Promise<ActivityModel>
 */
export async function getById(id: string | number): Promise<ActivityModel> {
  var list = await this.getRawActivities();
  var item = list.find(item => item.id === id);
  return item ? this.toModel(item) : null;
}
