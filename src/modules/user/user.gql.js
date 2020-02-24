import gql from 'graphql-tag'

export const GetUser = gql`
  query GetUser {
    me {
      _id
      allowance
      dueDate
    }
  }
`

export const UpdateUser = gql`
  mutation UpdateUser($input: UserInput) {
    saveUser(input: $input) {
      _id
      email
      allowance
      dueDate
    }
  }
`