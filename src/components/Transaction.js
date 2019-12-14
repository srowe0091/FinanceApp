import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const TransactionEntry = ({ key, amount, description }) => {
  return (
    <Box
      key={key}
      mb={2}
      p={1.5}
      display="flex"
      justifyContent="space-between"
      boxShadow={2}
      borderRadius="8px"
      bgcolor="white">
      <Typography>{description}</Typography>

      <Typography>${(amount / 100).toFixed(2)}</Typography>
    </Box>
  )
}

TransactionEntry.propTypes = {
  key: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string
}
