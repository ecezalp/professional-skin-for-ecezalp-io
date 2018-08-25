import React, {Component} from 'react';

import PropTypes from 'prop-types';
import Navbar from "../inputs/navbar";
import formPassword from "../../../secrets/password";

export default class EntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: this.getEmptyEntry(),
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.entryRepository.getNextId()
      .then(response => {
        let entry = this.state.entry;
        entry["id"] = response;
        this.setState({entry});
      })
  }

  getTitle(title) {
    return <div className={'form-title'}>
      {title}
    </div>
  }

  getTextField(title, field) {
    return <div className="text-field-container">
      {this.getTitle(title)}
      <input
        className={"field"}
        onChange={(e) => this.handleEntryChange(field, e.target.value)}
        value={this.state.entry[field]}
      />
    </div>
  }

  getTextArea(title, field) {
    return <div className="text-field-container">
      {this.getTitle(title)}
      <textarea
        className={field.toLowerCase()}
        value={this.state.entry[field]}
        onChange={(e) => this.handleEntryChange(field, e.target.value)}
      />
    </div>;
  }

  getCheckbox(title, checked) {
    return <div className="text-field-container">
      <div className="checkbox-container">
        {this.getTitle(title)}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => this.handleEntryChange("isLinkDump", checked)}
        />
      </div>
    </div>;
  }

  handleEntryChange(field, value) {
    let entry = this.state.entry;
    entry[field] = value;
    this.setState({entry});
  }

  getPasswordField() {
    return <div className="text-field-container">
      {this.getTitle("Password")}
      <input
        type="password"
        className={"password"}
        onChange={e => this.setState({password: e.target.value})}
        value={this.state.password}
      />
    </div>;
  }

  getSubmitButton() {
    const button = <div className="submit-button">
      <input
        type="submit"
        value="Submit"
        onClick={this.handleSubmit}/>
    </div>;

    return this.state.password === formPassword && button;
  }

  handleSubmit() {
    this.props.entryRepository.create(this.state.entry);
    this.setState({entry: this.getEmptyEntry(), password: ""});
    window.location.replace("/");
  }

  getEmptyEntry() {
    return Object.assign({}, {
      id: "",
      title: "",
      shortText: "",
      tags: [],
      text: "",
      isLinkDump: false,
      colors: ["", "", "", "", "", "", ""],
      friendlyUrl: "",
      date: "",
    });
  }

  getNavbar() {
    return <Navbar pathname={this.props.pathname}/>;
  }

  getExplanation() {
    return <div className="explanation">
      This website is a CMS that I wrote myself, and this little area is where I make my posts. You will not be able to
      make a post without entering the password, but you can play around!
    </div>
  }

  render() {
    return <div className="form-container">
      {this.getNavbar()}
      {this.getExplanation()}
      <div className="form">
        {this.getTextField("Title", "title")}
        {this.getTextField("Tags", "tags")}
        {this.getTextField("Friendly URL", "friendlyUrl")}
        {this.getTextArea("Short Text", "shortText")}
        {this.getTextArea("Text", "text")}
        {this.getTextField("Date", "date")}
        {this.getCheckbox("Link Dump", !this.state.entry.isLinkDump)}
        {this.getPasswordField()}
        {this.getSubmitButton()}
      </div>
    </div>
  };
}

EntryForm.propTypes = {
  entryRepository: PropTypes.object,
  pathname: PropTypes.string,
};