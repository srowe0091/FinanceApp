import gql from 'graphql-tag'

export const TransactionFragment = gql`
  fragment TransactionFragment on Transaction {
    id
    paid
    group
    amount
    date
    description
    card {
      id
      name
    }
  }
`

export const UserTransactions = gql`
  query UserTransactions($inGroup: Boolean! = false) {
    groupSpent @include(if: $inGroup)
    transactions {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`

export const GetCardsTransactions = gql`
  query GetCardsTransactions($cardId: ID) {
    transactionsByCard(cardId: $cardId) {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`

export const NewTransaction = gql`
  mutation NewTransaction($input: TransactionInput!) {
    newTransaction(input: $input) {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`

export const UpdateTransaction = gql`
  mutation UpdateTransaction($input: TransactionInput!) {
    updateTransaction(input: $input) {
      ...TransactionFragment
    }
  }
  ${TransactionFragment}
`
