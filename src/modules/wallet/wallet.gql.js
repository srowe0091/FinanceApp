import gql from 'graphql-tag'

export const CardFragment = gql`
  fragment CardFragment on Card {
    _id
    name
    type
    dueDate
    createdAt
  }
`

export const GetWallet = gql`
  query GetWallet {
    cards {
      ...CardFragment
    }
  }
  ${CardFragment}
`