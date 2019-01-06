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
export enum ActivityType {
  REPEAT,
  ONCE,
  TEMP
}

/**
 * Lets maintain the status of each activity here in case we have to add more
 */
export enum ActivityStatus {
  DISABLED,
  ACTIVE
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
