import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

const useStyles = createUseStyles({
  container: {
    height: 5,
    width: '100%',
    borderRadius: 50,
    background: 'var(--gray4)'
  },
  progress: {
    height: 10,
    width: ({ percent }) => `${percent * 100}%`,
    transform: 'translateY(-20%)',
    background:
      'linear-gradient(90deg, var(--ion-color-primary) 0%, var(--ion-color-primary-tint) 70%, var(--ion-color-primary) 100%);',
    borderRadius: 'inherit'
  }
})

export const ProgressBar = ({ className, percent }) => {
  const classes = useStyles({ percent })
  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.progress} />
    </div>
  )
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  className: PropTypes.string
}
