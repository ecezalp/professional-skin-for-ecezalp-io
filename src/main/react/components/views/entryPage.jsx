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
        this.setState({entry: response});
        !response.isLinkDump && this.highlightCode();
        this.setLinkTargetsToBlank();
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
      {tags.split(",").map(tag =>
        <Link
          className="tag"
          to={`/tags/${tag.replace(' ', '-').toLowerCase()}`}>
          {tag}
        </Link>
      )}
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
    this.modifyDOM('pre code', (node) => hljs.highlightBlock(node));
  }

  setLinkTargetsToBlank() {
    this.modifyDOM('a', (node) => node.setAttribute("target", "_blank"));
  }

  modifyDOM(selector, callback) {
    setTimeout(() => {
      const nodes = document.querySelectorAll(selector);
      for (let i = 0; i < nodes.length; i++) {
        callback(nodes[i]);
      }
    }, 50);
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