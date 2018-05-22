import styles, { classes } from './styles'

export default ({ children }) => (
  <div className={classes.root}>
    {children}

    {styles}

    <style>
      {`
        .hljs-attr,
        .hljs-bullet {
          color: #8625ea;
        }
        .hljs-number {
          color: #219cab;
        }
        .hljs-string {
          color: #484a5f;
        }
      `}
    </style>
  </div>
)
