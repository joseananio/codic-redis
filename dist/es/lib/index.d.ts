import Tasks from "./tasks/index";
import Activities from "./activities/index";
declare class RedisDriver {
    db: any;
    keyBase: string;
    tasks: Tasks;
    activities: Activities;
    constructor();
}
export default RedisDriver;
