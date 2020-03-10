import * as yup from 'yup'

export const UserProfileSchema = yup.object().shape({
  allowance: yup.number().moreThan(0).required(),
  dueDate: yup
    .number()
    .required()
    .min(0)
    .max(31)
})
