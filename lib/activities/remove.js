/**
 *
 * @param {string} id_name remove by name or id
 */
import JSONfn from "../utils/to-from-json";

export default async function(id_name) {
  var activities = await this.getActivities();
  var activity = activities.find(
    activity => activity.id === id_name || activity.name === id_name
  );
  if (activity) {
    activities = activities.filter(a => a.id !== activity.id);
    await this.db.set(this.keyBase + ":activity", JSONfn.stringify(current));
    return true;
  }
}
