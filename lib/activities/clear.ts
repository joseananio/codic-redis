import JSONfn from "../utils/to-from-json";

/**
 * remove all activities
 * @returns Promise<number> number of tasks removed
 */
export default async function clear(): Promise<number> {
  let list = await this.getRawActivities();
  var numRemoved = list.length;
  await this.driver.db.set(this.storageKey, JSONfn.stringify([]));
  return numRemoved;
}
