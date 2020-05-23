import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonText } from '@ionic/react'
import { createUseStyles } from 'react-jss'

import { AspectRatio } from 'elements'
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

const defaultTagStyling = {
  content: '""',
  width: '45%',
  height: '95%',
  display: 'block',
  top: '0px',
  position: 'absolute',
  clip: 'rect(1px, 25px, 20px, 1px)',
  background: 'transparent',
  borderBottomRightRadius: '100%',
  boxShadow: '0px 0px 0px 20px var(--gray7)'
}

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
  default: {
    padding: theme.spacing(0.1, 1.5, 0.25),
    top: '2px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-100%)',
    position: 'absolute',
    backgroundColor: 'var(--gray7)',
    borderRadius: theme.spacing(2, 2, 0, 0),
    zIndex: -1,
    '&::before': {
      ...defaultTagStyling,
      left: '5px',
      transform: 'translateY(0) translateX(-100%)'
    },
    '&::after': {
      ...defaultTagStyling,
      right: '5px',
      transform: 'translateY(0) translateX(100%) scaleX(-1)'
    }
  },
  VISA: {
    background: 'linear-gradient(135deg, #6d87e7 0%, #6bcbe1 100%)',
    boxShadow: '0px 10px 20px -5px #2d97bd',
    '&::before': cardTitle(theme.spacing(2), 'VISA')
  },
  DISCOVER: {
    background: 'linear-gradient(135deg, #dd581c 0%, #fba321 100%)',
    boxShadow: '0px 10px 20px -5px #dd581c',
    '&::before': cardTitle(theme.spacing(2), 'DISCOVER')
  },
  MASTERCARD: {
    background: 'linear-gradient(135deg, #e52e29 0%, #f89d2d 100%)',
    boxShadow: '0px 10px 20px -5px #f5742d',
    '&::before': cardTitle(theme.spacing(2), 'MASTERCARD')
  },
  AMERICAN_EXPRESS: {
    background: 'linear-gradient(135deg, #01aae3 0%, #27256c 100%)',
    boxShadow: '0px 10px 20px -5px #2e1c92',
    '&::before': cardTitle(theme.spacing(2), 'AMEX')
  },
  mini: {
    padding: '2px 6px',
    boxShadow: 'none',
    borderRadius: '6px',
    '&::before': {
      content: 'none'
    }
  }
}))

const cardMap = {
  VISA: 'Visa',
  DISCOVER: 'Discover',
  MASTERCARD: 'MC',
  AMERICAN_EXPRESS: 'Amex'
}

export const Card = ({ className, type, createdAt, isDefault, small, dueDate = 'XX', name = 'Name of Card' }) => {
  const classes = useStyles()
  const _createdDate = useMemo(() => (createdAt ? formatDate(createdAt, 'MM/YYYY') : 'XX/XXXX'), [createdAt])

  if (small) {
    return (
      <div className={clsx(classes.mini, classes[type], className)}>
        <p>{cardMap[type]}</p>
      </div>
    )
  }

  return (
    <AspectRatio className={className} ratio={7 / 4} maxWidth={350}>
      <div className={clsx(classes.container, classes[type])}>
        {isDefault && (
          <p variant="caption" className={classes.default}>
            Default
          </p>
        )}
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

        {/* {createdAt && (
          <Button color="medium" size="small" className={classes.details}>
            Details
          </Button>
        )} */}
      </div>
    </AspectRatio>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  createdAt: PropTypes.string,
  isDefault: PropTypes.bool,
  small: PropTypes.bool,
  name: PropTypes.string,
  dueDate: PropTypes.number
}
