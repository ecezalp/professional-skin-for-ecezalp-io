import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

export default function AboutPage() {

  const aboutText = [
    <div>Hello there! This is Ece. My name is pronounced like edge-a. I also go by AJ due to the phonetic similarity.</div>,
    <div>My passions include test driven development, pair programming, and fullstack web development. You can find my <Link
      to="/resume">résumé</Link> here.</div>,
    <div>I was born in Istanbul, Turkey, and I lived there for almost twenty years. I spent eight years in United States, studying first and working later. I have recently moved to Vancouver, and I could not be happier!</div>,
    <div>After studying Political Science and Literature and getting a graduate degree in Creative Writing, I switched my career path in 2016 and became a technology worker. I worked at a software consulting firm as well as a large financial institution as an engineer.</div>,
    <div>Other than coding, I enjoy reading, learning, and web design.</div>
  ];

  return <div className="about-container">
    <div className="about">
      {aboutText.map((item, index) => <Fragment key={`about-${index}`}>{item}<br/></Fragment>)}
    </div>
  </div>;
}
