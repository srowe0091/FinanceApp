import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    email
    isAdmin
    inGroup
    income
    allowance
    profileImage
    defaultCard {
      id
    }
  }
`

export const GetUser = gql`
  query GetUser {
    me {
      ...UserFragment
    }
  }
  ${UserFragment}
`

export const SaveUser = gql`
  mutation SaveUser($input: UserInput!) {
    updateUser(input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
