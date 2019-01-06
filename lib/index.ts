import Redis from "ioredis";
import Tasks from "./tasks/index";
import Activities from "./activities/index";

class RedisDriver {
  public db: any;
  public keyBase: string;
  public tasks: Tasks;
  public activities: Activities;

  constructor() {
    this.db = new Redis(arguments);
    this.keyBase = "codic";
    this.tasks = new Tasks(this);
    this.activities = new Activities(this);
  }
}

export default RedisDriver;
