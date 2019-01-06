import JSONfn from "../utils/to-from-json";
/**
 * remove tasks in memory only
 * @returns Promise<number> number of tasks removed
 */
export default async function clear(): Promise<number> {
  let list = await this.getRawTasks();
  var numRemoved = list.length;
  await this.db.set(this.keyBase + ":tasks", JSONfn.stringify([]));
  return numRemoved;
}
