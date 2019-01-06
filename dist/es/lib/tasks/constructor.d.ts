export interface IATasks {
    /**
     * Storage object for in-memory storage. Other drivers may not need this
     * @property lists
     */
    db: any;
    keyBase: string;
}
export declare abstract class ATasks implements IATasks {
    db: any;
    keyBase: string;
    /**
     * Create a new tasks storage
     */
    constructor(driver: any);
    getRawTasks(): Promise<Array<Object>>;
    makeId(): string;
}
