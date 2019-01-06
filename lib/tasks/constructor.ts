import Redis from "ioredis";
import { TaskModel } from "../decs";
import { getTasksRaw } from "./fetch-tasks";

export interface IATasks {
  /**
   * Storage object for in-memory storage. Other drivers may not need this
   * @property lists
   */
  // list?: Array<TaskModel>;
  db: any;
  keyBase: string;
}

export abstract class ATasks implements IATasks {
  // public list: Array<TaskModel> = new Array();
  public db: any;
  public keyBase: string;
  /**
   * Create a new tasks storage
   */
  constructor(driver: any) {
    this.db = driver.db;
    this.keyBase = driver.keyBase;
  }
  public getRawTasks(): Promise<Array<Object>> {
    return getTasksRaw.apply(this);
  }
  public makeId(): string {
    return Math.random()
      .toString(36)
      .slice(2);
  }
}
