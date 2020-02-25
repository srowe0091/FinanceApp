import gql from 'graphql-tag'

import { TransactionFragment } from 'modules/transaction'

export const GroupTransactions = gql`
  query GroupTransactions {
    admin {
      groupTransactions {
        owner
        ...TransactionFragment
      }
    }
  }
  ${TransactionFragment}
`

export const PayTransactions = gql`
  mutation PayTransactions($transactionIds: [ID]!) {
    admin {
      payTransactions(transactionIds: $transactionIds) {
        id
      }
    }
  }
`