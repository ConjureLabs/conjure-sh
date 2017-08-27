import classnames from 'classnames';

import styles, { classes } from './styles.js';
import { cards } from '../../utils/credit-cards/index.js';
import config from '../../shared/config.js';

export default ({ name, expiration, last4, brand, className }) => {
  const cardUsed = cards[brand] ? cards[brand] : cards.Visa;
  const brandFormatTokens = cardUsed.format.length;
  const mungedNumberTokens = cardUsed.format.map((length, i) => {
    if (i < brandFormatTokens - 1) {
      return '*'.repeat(length);
    }

    const prefix = '*'.repeat(Math.max(length - 4, 0));
    return `${prefix}${last4}`;
  });
  const brandLogoClassname = !cards[brand] ? null : brand.toLowerCase().replace(/\s+/, '-');

  const logoComponent = brandLogoClassname ? (
    <ins className={classnames(classes.logo, classes[brandLogoClassname])} />
  ) : null;

  return (
    <article className={classnames(classes.root, className)}>
      {logoComponent}

      <div className={classes.number}>
        {mungedNumberTokens.map(token => {
          return (
            <span className={classes.token}>
              {token}
            </span>
          );
        })}
      </div>

      <div className={classes.details}>
        <span className={classes.expirationWrap}>
          <label>Good Thru</label>
          <span className={classes.expiration}>
            <ins className={classes.token}>
              {expiration.month}
            </ins>
            /
            <ins className={classes.token}>
              {`${('' + expiration.year).substr(-2)}`}
            </ins>
          </span>
        </span>

        <span className={classes.name}>{name}</span>
      </div>

      {styles}
    </article>
  );
};
