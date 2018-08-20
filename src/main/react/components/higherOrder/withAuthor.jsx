import React from 'react';
import author from "../../../resources/about/author.png";
import Navbar from "../inputs/navbar";

export default function WithAuthor({children, pathname}) {

  const picture = <img className="author-pic" src={author}/>;

  const name = <div className="author-name">Ece Özalp</div>;

  const titles = <React.Fragment>
    <div className="author-title">Software Engineer</div>
    <div className="author-title">Loves TDD and Pair Programming</div>
    <div className="author-title">uses React, Spring, and more</div>
  </React.Fragment>;

  return <div className="author-container">
    <Navbar pathname={pathname}/>
    <div className="info-container">
      {picture}
      {name}
      {titles}
    </div>
    {children}
  </div>
}
