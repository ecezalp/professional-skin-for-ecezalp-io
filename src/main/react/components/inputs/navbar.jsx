import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar({pathname}) {

  const links = [
    {
      to: "/archive",
      text: "Archive",
    },
    {
      to: "/tags",
      text: "Tags",
    },
    {
      to: "/about",
      text: "About",
    },
    {
      to: "/gallery/1",
      text: "Gallery",
    },
  ];

  if (pathname !== "/") links.unshift({
    to: "/",
    text: "← Home",
  });

  return <div className="navbar">
    {links.map(({to, text}) => <Link to={to}>{text}</Link>)}
  </div>
}