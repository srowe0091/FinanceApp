import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { parseISO, format } from 'date-fns'

const useTransactionStyles = createUseStyles({
  transaction: {
    marginBottom: 16,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
    color: 'var(--white)',
    backgroundColor: 'var(--themeGray1)',
    boxShadow: '0px 2px 5px -2px var(--black)'
  }
})

export const TransactionEntry = ({ key, amount, description, dateCreated }) => {
  const classes = useTransactionStyles()
  return (
    <div key={key} className={classes.transaction}>
      <div>
        <p>{description}</p>
        <p color="textSecondary" variant="caption">{format(parseISO(dateCreated), 'M/d/y')}</p>
      </div>
      <p>${(amount / 100).toFixed(2)}</p>
    </div>
  )
}

TransactionEntry.propTypes = {
  key: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  dateCreated: PropTypes.string
}
