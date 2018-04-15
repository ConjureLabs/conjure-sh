import title from 'title'

export default ({ children, className }) => (
  <span className={className}>
    {children ? title(children) : null}
  </span>
)
