import React from 'react';

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
    return entries.map(entry => (({title, shortText}) => ({title, shortText}))(entry));
  }

  render(){
    console.log(this.state.entries);
    return this.state.entries;
  }
}