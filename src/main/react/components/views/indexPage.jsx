import React from 'react';
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
    return entries.map(entry => (({title, shortText, date, id}) => ({title, shortText, date, id}))(entry));
  }

  getEntry({title, shortText, date, id}) {
    return <div className="short-entry-container" key={id}>
      <div className="title-date">
        <div className="entry-title">{title}</div>
        <div className="entry-date">{getIndexFormat(date)}</div>
      </div>
      <div className="entry-short-text">{shortText}</div>
    </div>
  }

  render() {
    return <div className="index-container">
      {this.state.entries.map(this.getEntry)}
    </div>;
  }
}