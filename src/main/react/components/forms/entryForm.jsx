import React, {Component} from 'react';

import {ChromePicker} from 'react-color';
import PropTypes from 'prop-types';

import formPassword from "../../../secrets/password";
import Navbar from "../inputs/navbar";

export default class EntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: this.getEmptyEntry(),
      isColorPickerVisible: false,
      activeColorIndex: -1,
      password: "",
    };

    this.colorSquareClickHandler = this.colorSquareClickHandler.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.entryRepository.getNextId()
      .then(response => {
        let entry = this.state.entry;
        entry["id"] = response;
        console.log(entry);
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

  getPasswordField() {
    return <div className="tags-container eio-field">
      <input
        className={"password"}
        onChange={(e) => this.setState({password: e.target.value})}
        value={this.state.password}
      />
    </div>;
  }

  getCheckbox(title) {
    let isLinkDump = !this.state.entry.isLinkDump;
    let checkboxClassName = `hex-square check is-${isLinkDump ? 'checked' : 'not-checked'}`;

    return <div className="islinkdump-container eio-field">
      <div className={'checkbox-container'}>
        {this.getTitle(title)}
        <div
          className={checkboxClassName}
          onClick={() => this.handleEntryChange("isLinkDump", isLinkDump)}>
        </div>
      </div>
    </div>;
  }

  handleEntryChange(field, value) {
    let entry = this.state.entry;
    entry[field] = value;
    this.setState({entry});
  }

  colorSquareClickHandler(index) {
    this.setState({isColorPickerVisible: true, activeColorIndex: index});
  }

  getColorSquare(hex, index) {
    return <div
      key={`hex-${index}`}
      className="hex-square"
      style={{backgroundColor: hex}}
      onClick={() => this.colorSquareClickHandler(index)}
    />;
  }

  getColorsContainer() {
    return <div className="colors-container eio-field">
      {this.getTitle("Colors")}
      {this.state.entry.colors.map((color, index) => this.getColorSquare(color, index))}
    </div>
  }

  getColorPicker() {
    return <div className="color-picker-container eio-field">
      {this.state.activeColorIndex > -1 &&
      <div>
        <div onClick={this.closeColorPicker}>x</div>
        <ChromePicker
          color={this.state.entry.colors[this.state.activeColorIndex]}
          onChangeComplete={(color, event) => this.handleColorChange(color, event)}
        />
      </div>}
    </div>
  }

  closeColorPicker() {
    this.setState({activeColorIndex: -1})
  }

  handleColorChange(color) {
    let entry = this.state.entry;
    entry.colors[this.state.activeColorIndex] = color.hex;
    this.setState({entry})
  }

  getSubmitButton() {
    if (this.state.password === formPassword) {
      return <div className="submit-button">
        <div
          className="submit"
          onClick={this.handleSubmit}
        >
          SUBMIT
        </div>
      </div>
    }
  }

  handleSubmit() {
    this.props.entryRepository.create(this.state.entry);
    this.setState({entry: this.getEmptyEntry(), password: ""})
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
        {this.getTextArea("Short Text", "shortText")}
        {this.getTextArea("Text", "text")}
        {this.getCheckbox("Link Dump")}
        {this.getColorsContainer()}
        {this.getColorPicker()}
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