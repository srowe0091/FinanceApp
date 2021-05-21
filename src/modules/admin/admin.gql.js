import gql from 'graphql-tag'

import { TransactionFragment } from 'modules/transaction'

export const GroupTransactions = gql`
  query GroupTransactions {
    admin {
      groupTransactions {
        owner {
          email
        }
        ...TransactionFragment
      }
    }
  }
  ${TransactionFragment}
`

export const UsersInGroup = gql`
  query UsersInGroup {
    admin {
      usersInGroup {
        id
        email
        allowance
      }
    }
  }
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
