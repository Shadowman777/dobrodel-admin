import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: 'Обязательное поле',
    required: 'Обязательное поле'
  },
  number: {
    negative: 'Значение должно быть отрицательным числом'
  },
  string: {}
})
