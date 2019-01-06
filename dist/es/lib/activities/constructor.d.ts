import { ActivityModel } from "../decs";
import { Activity } from "codic";
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
export declare abstract class AActivities implements IAActivities {
    list: Array<ActivityModel>;
    driver: any;
    subKey: string;
    storageKey: string;
    /**
     * Create a new activity storage
     */
    constructor(driver: any);
    getRawActivities(): Promise<Array<Object>>;
    makeId(): string;
    toModel(activity: Activity): any;
}
