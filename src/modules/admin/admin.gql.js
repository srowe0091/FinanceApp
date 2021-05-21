import gql from 'graphql-tag'

import { CardFragment } from 'modules/wallet'
import { TransactionFragment } from 'modules/transaction'

export const GroupTransactions = gql`
  query GroupTransactions {
    admin {
      groupTransactions {
        user {
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
        cards {
          ...CardFragment
        }
      }
    }
  }
  ${CardFragment}
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
