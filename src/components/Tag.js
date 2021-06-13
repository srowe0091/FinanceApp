import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

const useStyles = createUseStyles(theme => ({
  tag: {
    padding: theme.spacing(0.6, 0.8),
    display: 'inline-flex',
    borderRadius: '6px'
  },
  GREEN: {
    color: '#49A584',
    backgroundColor: '#DBFFF2'
  }
}))

export const Tag = ({ label, color = 'GREEN' }) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.tag, classes[color])}>
      <span variant="caption">{label}</span>
    </div>
  )
}

Tag.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(['GREEN'])
}
