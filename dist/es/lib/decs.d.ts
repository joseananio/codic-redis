export interface TaskConfig {
    priority?: number;
    status?: number;
}
export interface TaskDefinition {
    (): void;
}
export interface TaskModel {
    name: string;
    id?: string | number;
    config: TaskConfig;
    definition: string | TaskDefinition;
}
/**
 * Lets manage the type of activity here for now
 */
export declare enum ActivityType {
    REPEAT = 0,
    ONCE = 1,
    TEMP = 2
}
/**
 * Lets maintain the status of each activity here in case we have to add more
 */
export declare enum ActivityStatus {
    DISABLED = 0,
    ACTIVE = 1
}
export interface IActivityAttr {
    skipInitial?: boolean;
    data?: object;
}
export interface ActivityModel {
    driver?: any;
    id?: string | number;
    status: ActivityStatus;
    nextRun: number;
    lastRun?: number;
    failedAt?: Date;
    failReason?: string;
    startedAt?: Date;
    type: ActivityType;
    _name?: string;
    attrs: IActivityAttr;
    taskNames: Array<string>;
}
export interface IActivity {
    driver: any;
    id?: string | number;
    status: ActivityStatus;
    nextRun: number;
    lastRun: number;
    failedAt: Date;
    startedAt: Date;
    failReason: string;
    type: ActivityType;
    _name: string;
    attrs: IActivityAttr;
    timesheet: number;
}
export interface IActivityConfig {
    driver?: any;
    id?: string | number;
    status?: ActivityStatus;
    nextRun?: number;
    lastRun?: number;
    failedAt?: Date;
    failReason?: string;
    type?: ActivityType;
    _name?: string;
    attrs?: IActivityAttr;
    timesheet?: number;
    taskNames?: Array<TaskModel>;
}
