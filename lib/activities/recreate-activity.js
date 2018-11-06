import Codic from "../../../sched";
export default function recreateActivity(activity) {
  let { tasks, ...config } = activity;
  config.driver = this;
  return new Codic.Activity(tasks, config);
}
