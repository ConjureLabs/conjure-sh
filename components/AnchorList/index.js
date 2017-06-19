import { Component } from 'react';
import styles from './styles.js';
import classnames from 'classnames';

export default class AnchorList extends Component {
  generateListItems(items) {
    const { onSelect } = this.props;

    return items.map(item => {
      return (
        <li key={item.key}>
          <a
            href=''
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
      <ol className={className}>
        {
          this.generateListItems(list)
        }

        <style jsx>{`
          ol {
            display: block;
            margin: 0 auto;
            max-height: 45rem;
            padding: 0 2.4rem;
            overflow: hidden;
            overflow-y: scroll;
          }
          ol::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 0.7rem;
          }
          ol::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.5);
            border-radius: 0.4rem;
            -webkit-box-shadow: 0 0 0.1rem rgba(255,255,255,0.5);
          }
          ol li {
            border: 1px solid #6567a2;
            display: block;
            margin-bottom: 1rem;
          }
          ol li:last-of-type {
            margin-bottom: 0;
          }
          ol li a {
            color: #6567a2;
            display: block;
            font-weight: 400;
            padding: 2rem;
          }
          ol li a:hover {
            background: #fff9dd;
          }
        `}
        </style>
      </ol>
    );
  }
}
