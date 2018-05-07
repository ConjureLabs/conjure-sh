import styles, { classes } from './styles'

export default ({ fullName, twitterHandle, picName }) => (
  <div className={classes.root}>
    <img src={`/static/images/team/${picName}`} />
    <span>{fullName}</span>
    <span>
      (
      {' '}
      <a
        href={`twitter.com/${twitterHandle}`}
        target='_blank'
      >
        @{twitterHandle}
      </a>
      {' '}
      )
    </span>

    {styles}
  </div>
)