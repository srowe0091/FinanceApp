import gql from 'graphql-tag'

export const PreferenceFragment = gql`
  fragment PreferenceFragment on Preferences {
    id
    income
    allowance
    defaultCard {
      id
      name
    }
  }
`

export const GetPreferences = gql`
  query GetPreferences {
    preferences {
      ...PreferenceFragment
    }
  }
  ${PreferenceFragment}
`

export const SavePreferences = gql`
  mutation SavePreferences($input: PreferencesInput!) {
    updatePreferences(input: $input) {
      ...PreferenceFragment
    }
  }
  ${PreferenceFragment}
`