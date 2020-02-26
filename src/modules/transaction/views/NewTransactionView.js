import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { Formik } from 'formik'
import * as yup from 'yup'
import replace from 'lodash/fp/replace'

import { Toolbar } from 'components'
import { Input, Button, MaskedInput, Checkbox } from 'elements'
import { NewTransaction } from '../transaction.gql'

const useNewTransactionViewStyles = createUseStyles(theme => ({
  wrapper: {
    height: '100%',
    margin: theme.spacing(0, 2),
    paddingTop: theme.spacing(2),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    left: 0,
    right: 0,
    bottom: theme.spacing(2),
    position: 'absolute'
  },
  moneyInput: {
    textAlign: 'center',
    fontSize: '70px'
  }
}))

const initialValues = { amount: 0, description: '', group: false }

const TransactionSchema = yup.object().shape({
  amount: yup.number().moreThan(0).required()
})

const formatInput = value => {
  const number = parseInt(replace(/\D/g)('')(value), '10')
  return [`$${(number/100).toFixed(2)}`, number]
}

const Home = ({ history }) => {
  const classes = useNewTransactionViewStyles()
  const [saveTransaction, { loading }] = useMutation(NewTransaction)
  const onSubmit = useCallback(({ amount, ...values}) => {
    saveTransaction({
      variables: {
        input: {
          amount: parseInt(replace(/\D/g)('')(amount), '10'),
          ...values
        }
      }
    })
    .then(() => history.goBack())
  }, [saveTransaction, history])

  return (
    <>
      <Toolbar back color='medium' title="New Transaction" />
      <IonContent color="dark">
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={TransactionSchema} validateOnMount>
          {({ handleSubmit, values, handleChange, handleBlur, isValid }) => (
            <form className={classes.wrapper} onSubmit={handleSubmit} autoComplete="off">
              <MaskedInput autoFocus className={classes.moneyInput} name="amount" format={formatInput} defaultValue={0} onBlur={handleBlur} onChange={handleChange} />
              <Input name="description" placeholder="memo" onBlur={handleBlur} onChange={handleChange} />
              <Checkbox label="Group Transaction" name="group" checked={values.group} onChange={handleChange} />
              <Button type="submit" className={classes.button} disabled={loading || !isValid} loading={loading}>Submit</Button>
            </form>
          )}
        </Formik>
      </IonContent>
    </>
  )
}

Home.propTypes = {
  history: PropTypes.object
}

export default Home
