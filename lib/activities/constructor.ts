import { ActivityModel } from "../decs";
import { getActivitiesRaw } from "./fetch-activities";
import { Activity } from "codic";
import toModel from "./to-model";

export interface IAActivities {
  /**
   * Storage object for redis database. Other drivers may not need this
   * @property list array of activities
   */
  list?: Array<ActivityModel>;
  /**
   * Redis database Driver object
   */
  driver: any;
  /**
   * Redis storage sub key, attached to driver base key
   */
  subKey: string;
  /**
   * Full redis storage key
   */
  storageKey: string;
}

export abstract class AActivities implements IAActivities {
  public list: Array<ActivityModel> = new Array();
  public driver: any;
  public subKey: string;
  public storageKey: string;
  /**
   * Create a new activity storage
   */
  constructor(driver: any) {
    this.driver = driver;
    this.subKey = ":activities";
    this.storageKey = this.driver.keyBase + this.subKey;
  }
  public getRawActivities(): Promise<Array<Object>> {
    return getActivitiesRaw.apply(this);
  }
  public makeId(): string {
    return Math.random()
      .toString(36)
      .slice(2);
  }
  public toModel(activity: Activity) {
    let args = [...arguments, this.driver];
    return toModel.apply(this, args);
  }
}
