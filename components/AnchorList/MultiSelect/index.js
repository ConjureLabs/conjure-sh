import AnchorList from '../index.js';
import styles, { classes } from './styles.js';

export default class AnchorMultiSelectList extends AnchorList {
  constructor() {
    super(...arguments);

    this.state = this.state || {};
    this.state.selected = [];
  }

  // assumes item.key is unique
  onClick(item) {
    const { selected } = this.state;
    const { key } = item;
    const arrIndex = selected.indexOf(key);

    if (arrIndex === -1) {
      selected.push(key);
    } else {
      selected.splice(arrIndex, 1);
    }

    this.setState({
      selected
    });
  }

  prepareLi(item, li) {
    if (this.state.selected.includes(item.key)) {
      li.props.className += ` ${classes.highlight}`;
    }

    return li;
  }

  additionalContent() {
    return styles;
  }

  get selected() {
    const { selected } = this.state;

    return this.props.list.filter(item => {
      return selected.includes(item.key);
    });
  }
}
