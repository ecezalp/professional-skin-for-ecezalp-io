import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getIndexFormat} from '../helpers/dateHelper';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    }
  }

  componentDidMount() {
    this.props.entryRepository.findAll()
      .then(response => this.setState({entries: this.formatEntries(response)}));
  }

  formatEntries(entries) {
    return entries.map(entry => (({title, shortText, date, id, friendlyUrl}) => ({
      title,
      shortText,
      date,
      id,
      friendlyUrl
    }))(entry));
  }

  getDetailedEntry({title, shortText, date, id}) {
    return <div className="detailed-entry-container" key={id}>
      <div className="title-date">
        <div className="entry-title">{title}</div>
        <div className="entry-date">{getIndexFormat(date)}</div>
      </div>
      <div className="entry-short-text">{shortText}</div>
    </div>
  }

  getShortEntry({title, date, id, friendlyUrl}) {
    return <Link to={`/archive/${friendlyUrl}`} key={id}>
      <div className="short-entry-container">
        <div className="entry-date">{getIndexFormat(date)}</div>
        <div className="entry-title">{title}</div>
      </div>
    </Link>;
  }

  render() {
    const {isDetailed} = this.props;

    return <div className="index-container">
      {!isDetailed && <div className="short-entry-container year">2018</div>}
      {this.state.entries.map(isDetailed ? this.getDetailedEntry : this.getShortEntry)}
    </div>;
  }
}

IndexPage.propTypes = {
  entryRepository: PropTypes.object,
  isDetailed: PropTypes.bool,
};