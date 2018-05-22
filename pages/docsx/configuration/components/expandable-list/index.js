import { Component } from 'react'
import classnames from 'classnames'

import Button from '../../../../../components/Button'

import styles, { classes } from './styles'

export default class ExpandableList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  render() {
    const { items, className } = this.props
    const { expanded } = this.state

    const hasSuppressedItems = items.find(item => item.suppress === true) !== undefined

    return (
      <span className={classnames(classes.root, {
        [classes.expanded]: expanded
      }, className)}>
        <ol className={classes.list}>
          {
            items
              .filter(item => expanded ? true : !item.suppress)
              .map((item, i) => (
                <li
                  key={i}
                  className={classes.item}
                >
                  {item.content}
                </li>
              ))
          }
        </ol>

        {!hasSuppressedItems ? null : (
          <Button
            size='small'
            color='gray'
            hallow={true}
            className={classes.toggle}
            onClick={() => {
              this.setState({
                expanded: !expanded
              })
            }}
          >
            {expanded ? 'View Less' : 'View All'}
          </Button>
        )}

        {styles}
      </span>
    )
  }
}
