import { ActivityModel } from "../decs";

/**
 * Returns a list of all activities
 * @returns Promise<Array<ActivityModel>>
 */
export default async function all(): Promise<Array<ActivityModel>> {
  let list = await this.getRawActivities();
  return list.map(item => this.toModel(item));
}
