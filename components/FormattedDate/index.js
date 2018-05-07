import moment from 'moment'

// see https://momentjs.com/docs/#/displaying/format/
export default ({ children, format = 'MMMM Mo, YYYY' }) => {
  const formatted = moment(children).format(format)
  return (
    <span>{formatted === 'Invalid date' ? null : formatted}</span>
  )
}
