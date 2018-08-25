import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

export default class TagsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {},
    }
  }

  componentDidMount() {
    this.props.entryRepository.findAll()
      .then(response => this.setState({tags: this.getTagsFromEntries(response)}));
  }

  getTagsFromEntries(entries) {
    return entries.reduce((acc, el) => {
      el.tags && el.tags.toLowerCase().split(",").forEach(tag => {
        acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
      });
      return acc;
    }, {});
  }

  renderTag({name, count}, index) {
    return <li
      key={`tag-${index}`}
      className="tag">
      <Link to={`/tags/${name.toLowerCase().replace(" ", "-")}`}>
        <span className="name">{name}</span>({count})
      </Link>
    </li>
  }

  orderTags(tags) {
    let sortable = Object.keys(tags).map((tagName => ({name: tagName.toLowerCase(), count: tags[tagName]})));
    return _.orderBy(sortable, ['count', 'name'], ['desc', 'asc']);
  }

  render() {
    return <div className="tags-container">
      <ul className="tags">
        {this.orderTags(this.state.tags).map(this.renderTag)}
      </ul>
    </div>;
  }
}

TagsPage.propTypes = {
  entryRepository: PropTypes.object,
};