import test from "ava";
import RedisDriver from "..";
import Codic from "codic";

const Task = Codic.Task;

let task = new Task("a job", { priority: 1 }, function() {
  console.log("Hello runner...");
});

var driver = new RedisDriver();
test("should create new task", async t => {
  const item = await driver.saveTask(task);
  t.is((await item) instanceof Task, true);
});

test("should return list of raw tasks", async t => {
  const res = await driver.getTasksRaw();
  t.is(await typeof res, "object");
});

test("should return list of tasks", async t => {
  const res = await driver.getTasks();
  let item = res.length > 0 ? res[0] : {};
  console.log("-----------", typeof item);
  t.is((await item) instanceof Task, true);
});

test("should get task by name", async t => {
  const item = await driver.getTask(task.name);
  t.is((await item) instanceof Task, true);
});
test.skip("should remove task", async t => {
  const res = await driver.removeTask(task.name);
  t.true(await res);
});
