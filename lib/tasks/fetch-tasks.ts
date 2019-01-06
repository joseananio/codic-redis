import JSONfn from "../utils/to-from-json";

export async function getTasksRaw(): Promise<Array<Object>> {
  var res = await this.db.get(this.keyBase + ":tasks");
  return res ? JSONfn.parse(res) : [];
}
