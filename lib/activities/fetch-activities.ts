import JSONfn from "../utils/to-from-json";

export async function getActivitiesRaw(): Promise<Array<Object>> {
  var res = await this.driver.db.get(this.storageKey);
  return res ? JSONfn.parse(res) : [];
}
