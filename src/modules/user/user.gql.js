import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    email
    isAdmin
    inGroup
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
