import gql from 'graphql-tag'

export const TransactionFragment = gql`
  fragment TransactionFragment on Transaction {
    id
    paid
    amount
    createdAt
    description
  }
`

export const UserTransactions = gql`
  query UserTransactions {
    transactions {
      group
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`

export const NewTransaction = gql`
  mutation NewTransaction($input: TransactionInput!) {
    saveTransaction(input: $input) {
      id
    }
  }
`
