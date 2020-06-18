import gql from 'graphql-tag'

const BillFragment = gql`
  fragment BillFragment on Bill {
    id
    name
    amount
    dueDate
    type
    notes
  }
`

export const GetBills = gql`
  query GetBills {
    bills {
      ...BillFragment
    }
  }
  ${BillFragment}
`

export const SaveNewBill = gql`
  mutation SaveNewBill($input: BillInput!) {
    newBill(input: $input) {
      ...BillFragment
    }
  }
  ${BillFragment}
`