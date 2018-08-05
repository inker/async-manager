import getRandomId from './getRandomId';
class AsyncManager {
    constructor() {
        this.callbacks = new Map();
    }
    add(id, callback) {
        this.callbacks.set(id, callback);
    }
    addAndGetId(callback) {
        const id = getRandomId();
        this.add(id, callback);
        return id;
    }
    resolve(id, data) {
        const callback = this.getCallbackAndDelete(id);
        callback(null, data);
    }
    reject(id, err) {
        const callback = this.getCallbackAndDelete(id);
        callback(err);
    }
    getCallbackAndDelete(id) {
        const callback = this.callbacks.get(id);
        if (!callback) {
            throw new Error(`no resolver with id = ${id}`);
        }
        this.callbacks.delete(id);
        return callback;
    }
}
export default AsyncManager;
//# sourceMappingURL=index.js.map