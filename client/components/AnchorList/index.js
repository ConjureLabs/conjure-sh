import { Component } from 'react';
import styles from './styles.styl';
import classnames from 'classnames';

export default class AnchorList extends Component {
  generateListItems(items) {
    const { onSelect } = this.props;

    return items.map(item => {
      return (
        <li
          className={styles.item}
          key={item.key}
        >
          <a
            href=''
            className={styles.link}
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
      <ol className={classnames(styles.root, className)}>
        {
          this.generateListItems(list)
        }
      </ol>
    );
  }
}