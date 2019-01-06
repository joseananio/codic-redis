import { ActivityModel } from "../decs";

export default function toModel(activity, driver: any): ActivityModel {
  let { id, ...others } = activity;

  const tm: ActivityModel = {
    driver: driver,
    id,
    ...others
  };
  return tm;
}
