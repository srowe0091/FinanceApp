import React, { useCallback, useState } from 'react'
import { IonContent, IonText } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { format } from 'date-fns'

import { TransactionEntry, Toolbar } from 'components'

import data from './data.json'

const useHomeViewStyles = createUseStyles({
  top: {
    width: '100%',
    height: '190px',
    top: 0,
    position: 'absolute',
    background: 'linear-gradient(140deg, var(--ion-color-secondary) 0%, var(--ion-color-primary) 100%)',
    '&:before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '90px',
      background: 'linear-gradient(to bottom, var(--alpha0) 0%, var(--themeGray2) 100%)',
      position: 'absolute',
      bottom: '-1px'
    }
  },
  content: {
    '--background': 'var(--themeGray2)'
  },
  card: {
    textAlign: 'center',
    width: '80%',
    height: '150px',
    margin: '1rem auto 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'relative',
    background: 'var(--white)',
    borderRadius: '20px',
  },
  transactions: {
    margin: '2rem 1rem 0'
  }
})

const Home = () => {
  const classes = useHomeViewStyles()
  const [toolbarStyle, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  return (
    <div>
      <Toolbar translucent color={toolbarStyle ? 'primary' : null} />
      <IonContent className={classes.content} fullscreen scrollEvents onIonScroll={scrollHandler}>
        <div className={classes.top} />

        <div className={classes.card}>
          <IonText>
            <p>{format(new Date(), 'EEEE, MMM dd, yyyy')}</p>
          </IonText>
          <IonText>
            <h2><strong>$257.95</strong></h2>
          </IonText>
          <IonText>
            <p>3 days left</p>
          </IonText>
        </div>

        <div className={classes.transactions}>
          {data.map(TransactionEntry)}
        </div>
      </IonContent>
    </div>
  )
}

export default Home
