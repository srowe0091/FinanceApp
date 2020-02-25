import gql from 'graphql-tag'

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
      id
      email
      allowance
      dueDate
    }
  }
`