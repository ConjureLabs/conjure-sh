import Author from '../Author'

import styles, { classes } from './styles'

export default ({ authors }) => (
  <div className={classes.root}>
    {authors.map(author => (
      <Author
        {...author}
        key={author.id}
      />
    ))}

    {styles}
  </div>
)