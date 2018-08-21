import React from 'react';
import PropTypes from 'prop-types';

import * as hljs from "highlight.js";
import ReactMarkdown from 'react-markdown';

import {Link} from 'react-router-dom';
import {getEntryFormat} from '../helpers/dateHelper';
import Navbar from "../inputs/navbar";

export default class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        shortText: "",
        date: "",
        title: "",
        tags: "",
        text: "",
      },
    }
  }

  componentDidMount() {
    this.props.entryRepository.findByFriendlyUrl(this.props.friendlyUrl)
      .then(response => {
        setTimeout(() => this.highlightCode(), 50);
        this.setState({entry: response})
      });
  }

  getTitle(title) {
    return <div className="title">{title}</div>
  }

  getSubtitle(text, date) {
    const formattedDate = getEntryFormat(date);
    const wordCount = `${text.split(" ").length} words`;
    const minutes = `${Math.floor(text.split(" ").length / 200)} minute read`;
    const filler = <div className="filler">·</div>;

    return <div className="subtitle">
      {formattedDate}
      {filler}
      {wordCount}
      {filler}
      {minutes}
    </div>
  }

  getTags(tags) {
    return <div className="tags-container">
      {tags.split(",").map(tag => <div className="tag">{tag}</div>)}
    </div>;
  }

  getText(text) {
    return <div className="text-container">
      <ReactMarkdown>
        {text}
      </ReactMarkdown>
    </div>;
  }

  highlightCode() {
    const nodes = document.querySelectorAll('pre code');

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  render() {
    const {title, text, date, tags} = this.state.entry;
    const {pathname} = this.props;

    return <div className="entry-page-container">
      <Navbar pathname={pathname}/>
      <div className="content">
        {this.getTitle(title)}
        {this.getSubtitle(text, date)}
        {this.getTags(tags)}
        {this.getText(text)}
      </div>
    </div>
  }
}

EntryPage.propTypes = {
  entryRepository: PropTypes.object,
  friendlyUrl: PropTypes.string,
  pathname: PropTypes.string,
};