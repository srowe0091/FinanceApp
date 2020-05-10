import gql from 'graphql-tag'

const PreferenceFragment = gql`
  fragment PreferenceFragment on Preferences {
    _id
    defaultCard
  }
`

export const GetPreferences = gql`
  query GetWallet {
    preferences {
      ...PreferenceFragment
    }
  }
  ${PreferenceFragment}
`

export const SavePreferemces = gql`
  mutation SaveNewCard($input: PreferencesInput!) {
    updatePreferences(input: $input) {
      ...PreferenceFragment
    }
  }
  ${PreferenceFragment}
`