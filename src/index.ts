import getRandomId from './getRandomId'

type ErrorCallback = (error: any) => void
type NormalCallback<T> = (error: null, value: T) => void

type Callback<T> = ErrorCallback | NormalCallback<T>

class AsyncManager<OutputType, Id> {
  private callbacks = new Map<Id, Callback<OutputType>>()

  add(id: Id, callback: Callback<OutputType>) {
    this.callbacks.set(id, callback)
  }

  addAndGetId(callback: Callback<OutputType>) {
    const id = getRandomId()
    this.add(id as any, callback)
    return id
  }

  resolve(id: Id, data: OutputType) {
    const callback = this.getCallbackAndDelete(id) as NormalCallback<OutputType>
    callback(null, data)
  }

  reject(id: Id, err: any) {
    const callback = this.getCallbackAndDelete(id) as ErrorCallback
    callback(err)
  }

  private getCallbackAndDelete(id: Id) {
    const callback = this.callbacks.get(id)
    if (!callback) {
      throw new Error(`no resolver with id = ${id}`)
    }

    this.callbacks.delete(id)
    return callback
  }
}

export default AsyncManager
