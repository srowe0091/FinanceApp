import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    email
    dueDate
    allowance
  }
`

export const GetUser = gql`
  query GetUser {
    me {
      ...UserFragment
      isAdmin
      inGroup
      cards {
        _id
        name
        dueDate
      }
    }
  }
  ${UserFragment}
`

export const UpdateUser = gql`
  mutation UpdateUser($input: UserInput) {
    saveUser(input: $input) {
      ...UserFragment
      cards {
        _id
        name
        dueDate
      }
    }
  }
  ${UserFragment}
`
