import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

export const StorageContainer = {
  get: async key => await Storage.get({ key }),
  set: async (key, value) => await Storage.set({ key, value }),
  remove: async key => await Storage.remove({ key }),
  clear: async () => await Storage.clear()
}
