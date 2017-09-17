import styles, { classes } from './styles.js';
import classnames from 'classnames';

// need to pass `key` to avoid react warning about unique keys
// anchors[] cells must have .href & .label - they can take any addition attributes an <a/> has like `target`
export default ({ key, className, anchors }) => {
  return (
    <div className={classnames(classes.root, className)}>
      <ul>
        {anchors.map((anchor, i) => {
          const { label, ...attributes } = anchor;

          return (
            <li key={`${key}-${i}`}>
              <a {...attributes}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      {styles}
    </div>
  );
};
