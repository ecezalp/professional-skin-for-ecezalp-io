import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {skillHelper, workHelper, schoolHelper} from "../helpers/resumeHelper";

export default function InfoPage({pathname}) {

  const about = [
    <div>Hello there! This is Ece. My name is pronounced like AJ - it is a common Turkish female name.</div>,
    <div>I was born in Istanbul (Turkey), and I lived there for almost twenty years. I spent eight years in United
      States, studying first and working later. I have recently moved to Vancouver, BC and I could not be
      happier!</div>,
    <div>After studying Political Science and Literature and getting a graduate degree in Creative Writing, I switched
      my career path in 2016 and became a technology worker. I worked at a software consulting firm as well as a large
      financial institution as an engineer.</div>,
    <div>My passions include test driven development, pair programming, and fullstack web development. You can find
      my <Link
        to="/resume">résumé</Link> here.</div>,
    <div>Other than coding, I enjoy reading, learning, and web design.</div>
  ];

  const workOrSchoolInfo = (helper) => helper.map(({title, date, info, place}) => <span className="job" key={`job-${title}`}>
    <div className="job-title">{title}<div className="place">{place}</div></div>
    <div className="job-date">{date}</div>
    <div className="job-info">{info}</div>
  </span>);

  const skillInfo = skillHelper.map(({title, subtitles}) => <span className="skill-container" key={`skill-${title}`}>
    <div className="skill-title">{title}</div>
    <ul>{subtitles.map((title, index) => <li key={`skill-${title}-${index}`}><div className="flex"><div className="divider">●</div>{title}</div></li>)}</ul>
  </span>);

  const resume = [
    <h3>Work Experience</h3>,
    workOrSchoolInfo(workHelper),
    <h3>Skills</h3>,
    skillInfo,
    <h3>Education</h3>,
    workOrSchoolInfo(schoolHelper),
  ];

  const renderText = textArray =>
    textArray.map((item, index) => <Fragment key={`about-${index}`}>{item}<br/></Fragment>);

  const className = pathname === "/about" ? "about" : "resume";

  const content = pathname === "/about" ? about : resume;

  return <div className="about-container">
    <div className={className}>
      {renderText(content)}
    </div>
  </div>;
}

InfoPage.propTypes = {
  pathname: PropTypes.string,
};
