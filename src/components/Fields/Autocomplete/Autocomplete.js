import React, { forwardRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonList, IonItem, IonLabel, IonIcon, IonSpinner } from '@ionic/react'
import { addCircle } from 'ionicons/icons'
import map from 'lodash/fp/map'

import { useAutocomplete } from './hooks'
import { Input } from '../Input'

export const useAutocompleteStyles = createUseStyles(theme => ({
  container: {
    position: 'relative'
  },
  suggestions: {
    marginTop: theme.spacing(-1),
    paddingTop: theme.spacing(2),
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1007,
    position: 'absolute',
    boxShadow: theme.boxShadow()
  },
  input: {
    zIndex: 1010
  },
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1005,
    position: 'fixed'
  },
  loading: {
    top: '8px',
    right: '12px',
    zIndex: 1020,
    position: 'absolute',
    background: 'var(--ion-color-light)'
  }
}))

export const Autocomplete = forwardRef(({ query, onChange, value, ...fieldProps }, ref) => {
  const classes = useAutocompleteStyles()
  const { suggestions, inputText, focused, loading, onInputChange, onFocus, onBlur } = useAutocomplete({ query })

  const selectOption = useCallback(
    value => () => {
      onChange(value)
      onInputChange({ target: { value: value.name } }, false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div className={classes.container}>
      <Input
        ref={ref}
        className={classes.input}
        value={inputText}
        onFocus={onFocus}
        onChange={onInputChange}
        {...fieldProps}
      />

      {loading && <IonSpinner className={classes.loading} name="dots" />}

      {focused && inputText && (
        <>
          {/* backdrop to prevent clicking behind while dropdown is open  */}
          <div className={classes.backdrop} onClick={onBlur} />

          <IonList className={classes.suggestions}>
            {map(option => (
              <div key={option.domain} onClick={onBlur}>
                <IonItem lines="full" button onClick={selectOption(option)}>
                  <img width="32" src={`${option.logo}?size=64`} alt="" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <IonLabel>{option.name}</IonLabel>
                </IonItem>
              </div>
            ))(suggestions)}

            <div onClick={onBlur}>
              <IonItem lines="full" onClick={selectOption({ name: inputText })}>
                <IonIcon size="large" color="dark" icon={addCircle} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <IonLabel>"{inputText}"</IonLabel>
              </IonItem>
            </div>
          </IonList>
        </>
      )}
    </div>
  )
})

Autocomplete.propTypes = {
  query: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
