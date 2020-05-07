import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { AspectRatio, Button } from 'elements'
import { IonText } from '@ionic/react'
import { formatDate } from 'utils'

const cardTitle = (spacing, content) => ({
  content: `"${content}"`,
  fontSize: '2em',
  fontStyle: 'italic',
  opacity: 0.3,
  lineHeight: 0.8,
  right: spacing,
  top: spacing,
  position: 'absolute'
})

const useStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(7, 2, 2, 2),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 'var(--borderRadius)'
  },
  opacityText: {
    opacity: 0.5
  },
  cardFooter: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  details: {
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    position: 'absolute'
  },
  VISA: {
    background: 'linear-gradient(135deg, #6d87e7 0%, #6bcbe1 100%)',
    boxShadow: '0px 10px 20px -5px #2d97bd',
    '&::before': cardTitle(theme.spacing(1), 'VISA')
  },
  DISCOVER: {
    background: 'linear-gradient(135deg, #dd581c 0%, #fba321 100%)',
    boxShadow: '0px 10px 20px -5px #dd581c',
    '&::before': cardTitle(theme.spacing(1), 'DISCOVER')
  },
  MASTERCARD: {
    background: 'linear-gradient(135deg, #e52e29 0%, #f89d2d 100%)',
    boxShadow: '0px 10px 20px -5px #f5742d',
    '&::before': cardTitle(theme.spacing(1), 'MASTERCARD')
  },
  AMERICAN_EXPRESS: {
    background: 'linear-gradient(135deg, #01aae3 0%, #27256c 100%)',
    boxShadow: '0px 10px 20px -5px #2e1c92',
    '&::before': cardTitle(theme.spacing(1), 'AMEX')
  }
}))

export const Card = ({ name, type, dueDate, createdAt }) => {
  const classes = useStyles(type)
  const _createdDate = useMemo(() => formatDate(createdAt, 'MM/YYYY'), [createdAt])
  return (
    <AspectRatio ratio={7 / 4} maxWidth={350}>
      <div className={clsx(classes.container, classes[type])}>
        <IonText>{name}</IonText>

        <IonText align="left">
          <p display="inline" className={classes.opacityText}>
            Due Date:
          </p>
          &nbsp;
          <p display="inline">{dueDate}</p>
        </IonText>

        <IonText align="left">
          <p display="inline" className={classes.opacityText}>
            Date Added:
          </p>
          &nbsp;
          <p display="inline">{_createdDate}</p>
        </IonText>

        <Button color="medium" size="small" className={classes.details}>
          Details
        </Button>
      </div>
    </AspectRatio>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  dueDate: PropTypes.number,
  createdAt: PropTypes.string
}
