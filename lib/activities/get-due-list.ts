import { ActivityModel } from "../decs";

export default async function getDueList(): Promise<Array<ActivityModel>> {
  var now = Date.now();

  var activeList = await this.getActive();
  return activeList.filter(activity => isDue(activity, now));
}

function isDue(activity: ActivityModel, at: number): boolean {
  return activity.nextRun - new Date(at).valueOf() <= 0;
}
