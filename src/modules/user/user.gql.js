import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    email
    dueDate
    allowance
  }
`

export const GetUser = gql`
  query GetUser {
    me {
      id
      allowance
      dueDate
    }
  }
`

export const UpdateUser = gql`
  mutation UpdateUser($input: UserInput) {
    saveUser(input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
