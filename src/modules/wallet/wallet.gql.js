import gql from 'graphql-tag'

export const CardFragment = gql`
  fragment CardFragment on Card {
    id
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

export const SaveNewCard = gql`
  mutation SaveNewCard($input: CardInput!) {
    saveNewCard(input: $input) {
      ...CardFragment
    }
  }
  ${CardFragment}
`