import gql from 'graphql-tag'

export const CompanySearch = gql`
  query CompanySearch($query: String) {
    autocomplete {
      company(query: $query) {
        name
        logo
        domain
      }
    }
  }
`
