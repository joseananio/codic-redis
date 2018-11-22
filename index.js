import Tasks from "./lib/tasks";
import Activities from "./lib/activities";
import Redis from "ioredis";

function driver(config = null) {
  this.db = new Redis(config);
  this.keyBase = "codi";
}

var tasks = new Tasks();
var activities = new Activities();

var proto = driver.prototype;

proto.saveTask = tasks.saveTask;
proto.getTask = tasks.getTask;
proto.removeTask = tasks.removeTask;
proto.getTasks = tasks.getTasks;
proto.getTasksRaw = tasks.getTasksRaw;

proto.getActivity = activities.getActivity;
proto.saveActivity = activities.saveActivity;
proto.getActivities = activities.getActivities;
proto.getActiveActivities = activities.getActiveActivities;
proto.getActivitiesRaw = activities.getActivitiesRaw;
proto.getDueActivities = activities.getDueActivities;
proto.getNextRunDelay = activities.getNextRunDelay;
proto.dropActivities = activities.clean;
proto.dropActivity = activities.remove;
proto.getNextRunDelay = activities.getNextRunDelay;
proto.recreateActivity = activities.recreateActivity;

driver.prototype = proto;
export default driver;
