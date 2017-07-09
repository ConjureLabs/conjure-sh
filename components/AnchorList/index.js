import { Component } from 'react';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default class AnchorList extends Component {
  onClick(item) {
    this.props.onSelect(item);
  }

  // should be overidden
  itemAdditionalClasses(item) {
    return null;
  }

  // should be overidden
  additionalContent() {
    return null;
  }

  generateListItems(items) {
    return items.map(item => {
      return (
        <li
          className={classnames(classes.item, this.itemAdditionalClasses(item))}
          key={item.key}
        >
          <a
            href=''
            className={classes.link}
            onClick={e => {
              e.preventDefault();
              this.onClick(item);
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

        {this.additionalContent()}
      </ol>
    );
  }
}
