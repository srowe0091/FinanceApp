import { useEffect, useCallback } from 'react'
import { LocalNotifications as CapacitorLocalNotifications } from '@capacitor/local-notifications'
import { useEffectOnce } from 'react-use'

export const LocalNotifications = () => {
  const ensurePermissions = useCallback(async () => {
    try {
      let { display } = await CapacitorLocalNotifications.checkPermissions()
      console.log('LocalNotifications display permission:', display)

      if (display === 'prompt') {
        display = await CapacitorLocalNotifications.requestPermissions()
      }

      if (display !== 'granted') {
        throw new Error('User denied permissions!')
      }

      return display
    } catch (e) {
      console.log('permissions error')
      console.error(e)

      return 'denied'
    }
  }, [])

  const registerListeners = useCallback(() => {
    try {
      CapacitorLocalNotifications.addListener('localNotificationReceived', notification => {
        console.log('Notification: ', notification)
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  const unRegisterListeners = useCallback(async () => {
    try {
      await CapacitorLocalNotifications.removeAllListeners()
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    registerListeners()

    return () => {
      unRegisterListeners()
    }
  }, [registerListeners, unRegisterListeners])

  useEffectOnce(async () => {
    await ensurePermissions()
  }, [])

  return null
}

export const createNotifications = async notifications => {
  return await CapacitorLocalNotifications.schedule({ notifications })
}
