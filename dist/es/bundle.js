import Redis from 'ioredis';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}
(function () {
    JSONfn.stringify = function (obj) {
        return JSON.stringify(obj, function (key, value) {
            return typeof value === "function" ? value.toString() : value;
        });
    };
    JSONfn.parse = function (str) {
        return JSON.parse(str, function (key, value) {
            if (typeof value != "string")
                return value;
            return value.substring(0, 8) == "function"
                ? eval("(" + value + ")")
                : value;
        });
    };
})();
var JSONfn$1 = JSONfn;

function getTasksRaw() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield this.db.get(this.keyBase + ":tasks");
        return res ? JSONfn$1.parse(res) : [];
    });
}

class ATasks {
    /**
     * Create a new tasks storage
     */
    constructor(driver) {
        this.db = driver.db;
        this.keyBase = driver.keyBase;
    }
    getRawTasks() {
        return getTasksRaw.apply(this);
    }
    makeId() {
        return Math.random()
            .toString(36)
            .slice(2);
    }
}

function toModel(task) {
    let { name, definition, id, config } = task;
    const tm = {
        id: id,
        name,
        definition,
        config
    };
    return tm;
}

/**
 * Get a single task by name
 * @param {string} name name of task
 * @returns Promise<TaskModel>
 */
function get(name) {
    return __awaiter(this, void 0, void 0, function* () {
        var tasks = yield this.getRawTasks();
        var task = tasks.find(task => task.name === name);
        return task ? toModel(task) : null;
    });
}
/**
 * Get a single task by id
 * The task should have been saved in the driver first
 * Not yet available in memory
 * @param {string} id id of task
 * @returns Promise<TaskModel>
 */
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var tasks = yield this.getRawTasks();
        var task = tasks.find(task => task.id === id);
        return task ? toModel(task) : null;
    });
}

/**
 * Returns a list of all tasks
 * @returns Promise<Array<TaskModel>>
 */
function all() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield this.getRawTasks();
        var tasks = res.map(toModel);
        return tasks;
    });
}

/**
 * Save task into database
 * Updates if name exists
 * @param {TaskModel} task task model object
 * @returns Promise<TaskModel>
 */
let save = function (task) {
    return __awaiter(this, void 0, void 0, function* () {
        var exists = false;
        var tasks = yield this.getRawTasks();
        tasks.forEach(function (_task, key) {
            if (_task.name === task.name) {
                tasks[key] = task;
                exists = true;
            }
        });
        if (!exists) {
            task.id = this.makeId();
            tasks.push(task);
        }
        yield this.db.set(this.keyBase + ":tasks", JSONfn$1.stringify(tasks));
        return toModel(task);
    });
};

/**
 * remove tasks in memory only
 * @returns Promise<number> number of tasks removed
 */
function clear() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield this.getRawTasks();
        var numRemoved = list.length;
        yield this.db.set(this.keyBase + ":tasks", JSONfn$1.stringify([]));
        return numRemoved;
    });
}

class Tasks extends ATasks {
    /**
     * Fetch all tasks in storage
     */
    all() {
        return all.apply(this);
    }
    /**
     * Get a single task by name
     * @param name name of task
     */
    get(name) {
        return get.apply(this, arguments);
    }
    /**
     * Get a single task by id
     * @param id id of task
     */
    getById(id) {
        return getById.apply(this, arguments);
    }
    /**
     * Save a task to storage
     * @param activity task model object
     */
    save(task) {
        return save.apply(this, arguments);
    }
    /**
     * Remove all tasks from storage
     * Returns number of items removed
     */
    clear() {
        return clear.apply(this);
    }
}

function getActivitiesRaw() {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield this.driver.db.get(this.storageKey);
        return res ? JSONfn$1.parse(res) : [];
    });
}

function toModel$1(activity, driver) {
    let { id } = activity, others = __rest(activity, ["id"]);
    const tm = Object.assign({ driver: driver, id }, others);
    return tm;
}

class AActivities {
    /**
     * Create a new activity storage
     */
    constructor(driver) {
        this.list = new Array();
        this.driver = driver;
        this.subKey = ":activities";
        this.storageKey = this.driver.keyBase + this.subKey;
    }
    getRawActivities() {
        return getActivitiesRaw.apply(this);
    }
    makeId() {
        return Math.random()
            .toString(36)
            .slice(2);
    }
    toModel(activity) {
        let args = [...arguments, this.driver];
        return toModel$1.apply(this, args);
    }
}

/**
 * Returns a list of all activities
 * @returns Promise<Array<ActivityModel>>
 */
function all$1() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield this.getRawActivities();
        return list.map(item => this.toModel(item));
    });
}

/**
 * Get a single activity by name
 * @param {string} name name of activity
 * @returns Promise<ActivityModel>
 */
function get$1(name) {
    return __awaiter(this, void 0, void 0, function* () {
        var list = yield this.getRawActivities();
        var item = list.find(item => item._name === name);
        return item ? this.toModel(item) : null;
    });
}
/**
 * Get a single activity by id
 * The activity should have been saved in the driver first
 * Not yet available in memory
 * @param {string} id id of activity
 * @returns Promise<ActivityModel>
 */
function getById$1(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var list = yield this.getRawActivities();
        var item = list.find(item => item.id === id);
        return item ? this.toModel(item) : null;
    });
}

/**
 * Save activity into redis db
 * Updates if name exists
 * @param {ActivityModel} activity activity model object
 * @returns Promise<ActivityModel>
 */
let save$1 = function (activity) {
    return __awaiter(this, void 0, void 0, function* () {
        var exists = false;
        delete activity.driver;
        var activities = yield this.getRawActivities();
        activities.forEach(function (_activity, key) {
            if (activity._name && _activity._name === activity._name) {
                activities[key] = activity;
                exists = true;
            }
        });
        if (!exists) {
            activity.id = this.makeId();
            activities.push(activity);
        }
        yield this.driver.db.set(this.storageKey, JSONfn$1.stringify(activities));
        return this.toModel(activity);
    });
};

/**
 * remove all activities
 * @returns Promise<number> number of tasks removed
 */
function clear$1() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield this.getRawActivities();
        var numRemoved = list.length;
        yield this.driver.db.set(this.storageKey, JSONfn$1.stringify([]));
        return numRemoved;
    });
}

/**
 * Lets manage the type of activity here for now
 */
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["REPEAT"] = 0] = "REPEAT";
    ActivityType[ActivityType["ONCE"] = 1] = "ONCE";
    ActivityType[ActivityType["TEMP"] = 2] = "TEMP";
})(ActivityType || (ActivityType = {}));
/**
 * Lets maintain the status of each activity here in case we have to add more
 */
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus[ActivityStatus["DISABLED"] = 0] = "DISABLED";
    ActivityStatus[ActivityStatus["ACTIVE"] = 1] = "ACTIVE";
})(ActivityStatus || (ActivityStatus = {}));

function getActive () {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield this.all();
        return list.filter(x => x.status === ActivityStatus.ACTIVE);
    });
}

function getDueList() {
    return __awaiter(this, void 0, void 0, function* () {
        var now = Date.now();
        var activeList = yield this.getActive();
        return activeList.filter(activity => isDue(activity, now));
    });
}
function isDue(activity, at) {
    return activity.nextRun - new Date(at).valueOf() <= 0;
}

function getNextRunDelay() {
    return __awaiter(this, void 0, void 0, function* () {
        var dt = null;
        var now = Date.now();
        var list = yield this.getActive();
        list.forEach(activity => {
            var nR = activity.nextRun;
            if (!dt)
                dt = nR;
            else
                dt = nR < dt ? nR : dt;
        });
        return dt - now;
    });
}

class Activities extends AActivities {
    /**
     * Get all active activities
     */
    getActive() {
        return getActive.apply(this);
    }
    /**
     * Get all activities
     */
    all() {
        return all$1.apply(this);
    }
    /**
     * Get a single activity by name
     * @param name name of activity
     */
    get(name) {
        return get$1.apply(this, arguments);
    }
    /**
     * Get a single activity by id
     * @param id id of activity
     */
    getById(id) {
        return getById$1.apply(this, arguments);
    }
    /**
     * Save activity to storage
     * @param activity activity model object
     */
    save(activity) {
        return save$1.apply(this, arguments);
    }
    /**
     * Remove all activities from storage
     * Returns number of items removed
     */
    clear() {
        return clear$1.apply(this);
    }
    /**
     * Get list of activities that are due for execution.
     * Compares the nextRun with current time
     */
    getDueList() {
        return getDueList.apply(this);
    }
    /**
     * Get the delay in miliseconds before next closest activity is due
     */
    getNextRunDelay() {
        return getNextRunDelay.apply(this);
    }
}

class RedisDriver {
    constructor() {
        this.db = new Redis(arguments);
        this.keyBase = "codic";
        this.tasks = new Tasks(this);
        this.activities = new Activities(this);
    }
}

export default RedisDriver;
