import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { Formik } from 'formik'
import replace from 'lodash/fp/replace'

import { Toolbar } from 'components'
import { Input, Button } from 'elements'
import { NewTransaction } from '../transaction.gql'

const useNewTransactionViewStyles = createUseStyles(theme => ({
  wrapper: {
    height: '100%',
    margin: theme.spacing(0, 2),
    paddingTop: theme.spacing(2),
    position: 'relative'
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

const initialValues = { amount: "$0.00" }

const formatInput = cb => e => {
  const number = parseInt(replace(/\D/g)('')(e.target.value), '10') / 100
  cb(e.target.name, `$${number.toFixed(2)}`)
}

const Home = ({ history }) => {
  const classes = useNewTransactionViewStyles()
  const [saveTransaction, { loading }] = useMutation(NewTransaction)
  const onSubmit = useCallback(values => {
    saveTransaction({
      variables: {
        input: {
          amount: parseInt(replace(/\D/g)('')(values.amount), '10'),
          description: values.description
        }
      }
    })
    .then(() => history.goBack())
  }, [saveTransaction, history])

  return (
    <>
      <Toolbar back color='primary' title="New Transaction" />
      <IonContent color="dark">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit, handleChange, values, handleBlur, setFieldValue }) => (
            <form className={classes.wrapper} onSubmit={handleSubmit} autoComplete="off">
              <Input className={classes.moneyInput} placeholder="0.00" name="amount" value={values.amount} onBlur={handleBlur} onChange={formatInput(setFieldValue)} />
              <Input name="description" placeholder="memo" onBlur={handleBlur} onChange={handleChange} />
              <Button type="submit" className={classes.button} disabled={loading} loading={loading}>Submit</Button>
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
