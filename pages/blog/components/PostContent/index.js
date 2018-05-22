import styles, { classes } from './styles'

export default ({ children }) => (
  <div className={classes.root}>
    {children}

    {styles}
  </div>
)
