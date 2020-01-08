import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useTransactionStyles = createUseStyles({
  transaction: {
    marginBottom: 16,
    padding: 12,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 8,
    color: 'var(--white)',
    backgroundColor: 'var(--themeGray1)',
    boxShadow: '0px 2px 5px -2px var(--black)'
  }
})

export const TransactionEntry = ({ key, amount, description }) => {
  const classes = useTransactionStyles()
  return (
    <div key={key} className={classes.transaction}>
      <p>{description}</p>

      <p>${(amount / 100).toFixed(2)}</p>
    </div>
  )
}

TransactionEntry.propTypes = {
  key: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string
}
