declare type ErrorCallback = (error: any) => void;
declare type NormalCallback<T> = (error: null, value: T) => void;
declare type Callback<T> = ErrorCallback | NormalCallback<T>;
declare class AsyncManager<OutputType, Id> {
    private callbacks;
    add(id: Id, callback: Callback<OutputType>): void;
    addAndGetId(callback: Callback<OutputType>): string;
    resolve(id: Id, data: OutputType): void;
    reject(id: Id, err: any): void;
    private getCallbackAndDelete;
}
export default AsyncManager;
