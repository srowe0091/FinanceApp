import { useEffect } from 'react'
import { Subject } from 'rxjs'
import reduce from 'lodash/fp/reduce'

const TOPICS = ['TOAST_NOTIFICATION']

class Pubsub {
  constructor() {
    this._subjects = reduce((acc, curr) => Object.assign(acc, { [curr]: new Subject() }))({})(TOPICS)
  }

  listen(topic, cb) {
    if (!this._subjects[topic]) {
      console.error(`"${topic}": topic does not exist`)
      return
    }
    return this._subjects[topic].subscribe({
      next: cb
    })
  }

  emit(topic, arg) {
    if (!this._subjects[topic]) {
      console.error(`"${topic}": topic does not exist`)
      return
    }
    this._subjects[topic].next(arg)
  }
}

const _pubsub = new Pubsub()

export const usePubSubListen = (topic, cb) => {
  useEffect(() => {
    const _subscription = _pubsub.listen(topic, cb)

    return () => _subscription.unsubscribe()
  }, [topic, cb])
}

export default _pubsub