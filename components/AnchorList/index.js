import { Component } from 'react';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default class AnchorList extends Component {
  generateListItems(items) {
    const { onSelect } = this.props;

    return items.map(item => {
      return (
        <li
          className={classes.item}
          key={item.key}
        >
          <a
            href=''
            className={classes.link}
            onClick={e => {
              e.preventDefault();
              onSelect(item);
            }}
            key={item.label}
          >
            {item.label}
          </a>
        </li>
      );
    });
  }

  render() {
    const { list, className } = this.props;

    return (
      <ol className={classnames(classes.root, className)}>
        {
          this.generateListItems(list)
        }

        {styles}
      </ol>
    );
  }
}
