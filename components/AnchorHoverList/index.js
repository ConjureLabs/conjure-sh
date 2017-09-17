import styles, { classes } from './styles.js';
import classnames from 'classnames';

// anchors[] cells must have .href & .label - they can take any addition attributes an <a/> has like `target`
export default ({ className, anchors }) => {
  return (
    <div className={classnames(classes.root, className)}>
      <ul>
        {anchors.map(anchor => {
          const { label, ...attributes } = anchor;

          return (
            <li>
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
