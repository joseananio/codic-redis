export default async function(id_name) {
  var activities = await this.getActivities();
  var activity = activities.find(
    activity => activity.id === id_name || activity.name === id_name
  );
  return activity || null;
}
