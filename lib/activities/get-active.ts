import { ActivityModel, ActivityStatus } from "../decs";

export default async function(): Promise<Array<ActivityModel>> {
  let list: Array<ActivityModel> = await this.all();
  return list.filter(x => x.status === ActivityStatus.ACTIVE);
}
