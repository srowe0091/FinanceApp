import * as yup from 'yup'

export const UserProfileSchema = yup.object().shape({
  allowance: yup.number().required(),
  dueDate: yup
    .number()
    .required()
    .min(0)
    .max(31)
})
