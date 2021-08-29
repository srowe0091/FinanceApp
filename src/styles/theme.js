const linearGradient = (color1, color2, degree = 315) => `linear-gradient(${degree}deg, ${color1} 0%, ${color2} 100%)`

const boxShadow = '0px 2px 5px -1px'

const field = {
  border: ({ error }) => `1px solid var(${error ? '--ion-color-danger' : '--alpha0'})`,
  boxShadow: ({ error }) => `${boxShadow} var(${error ? '--ion-color-danger' : '--alpha50'})`
}

const theme = {
  field,
  linearGradient,
  spacing: (...size) => size.map(s => (s === 'auto' ? 'auto' : s * 8 + 'px')).join(' '),
  boxShadow: (color = '--alpha50') => `${boxShadow} var(${color})`,
  transition: ({ property = 'all', duration = 500, timing = 'ease-in-out' }) => `${property} ${duration}ms ${timing}`
}

export default theme
