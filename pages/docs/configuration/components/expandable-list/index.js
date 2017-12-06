import { Component } from 'react';
import classnames from 'classnames';

import styles, { classes } from './styles';

export default class ExpandableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render() {
    const { items, className } = this.props;
    const { expanded } = this.state;

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

        <a
          href=''
          onClick={e => {
            e.preventDefault();
            this.setState({
              expanded: !expanded
            });
          }}
          className={classes.toggle}
        >
          {expanded ? 'View Less' : 'View More'}
        </a>

        {styles}
      </span>
    );
  }
}
