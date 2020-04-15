import gql from 'graphql-tag'

export const TransactionFragment = gql`
  fragment TransactionFragment on Transaction {
    id
    paid
    group
    amount
    createdAt
    description
  }
`

export const UserTransactions = gql`
  query UserTransactions {
    groupSpent
    transactions {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`

export const NewTransaction = gql`
  mutation NewTransaction($input: TransactionInput!) {
    saveTransaction(input: $input) {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`
