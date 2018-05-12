import moment from 'moment'

// see https://momentjs.com/docs/#/displaying/format/
export default ({ children, className, format = 'MMMM Mo, YYYY' }) => {
  const formatted = moment(children).format(format)
  return (
    <span className={className}>{formatted === 'Invalid date' ? null : formatted}</span>
  )
}
