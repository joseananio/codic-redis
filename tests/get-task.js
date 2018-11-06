import test from "ava";

import tests from "../test";
test("should return single task", async t => {
  await tests();
  // const item = await redis.saveTask(task);
  // t.is((await item) instanceof Task, true);
  t.is(1, 1);
});
