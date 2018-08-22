import React from 'react';

import IndexPage from "./components/views/indexPage";
import EntryPage from "./components/views/entryPage";
import TagsPage from "./components/views/tagsPage";


import Gallery from "./components/views/gallery/index";
// import EntryForm from './components/forms/entryForm';
import WithAuthor from "./components/higherOrder/withAuthor";
import EntryRepository from "./components/repositories/entryRepository";

import {BrowserRouter, Route} from "react-router-dom";
import AboutPage from "./components/views/aboutPage";

export default function App() {

  const entryRepository = new EntryRepository();

  const scrollUp = () => window.scrollTo(0, 0);

  const getIndexPage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <IndexPage
        entryRepository={entryRepository}
        isDetailed={true}
      />
    </WithAuthor>;
  };

  const getArchivePage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <IndexPage
        entryRepository={entryRepository}
      />
    </WithAuthor>;
  };

  const getEntryPage = (props) => {
    scrollUp();
    return <EntryPage
      friendlyUrl={props.match.params.friendlyUrl}
      entryRepository={entryRepository}
      pathname={props.location.pathname}
    />
  };

  const getTagsPage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <TagsPage
        entryRepository={entryRepository}
      />
    </WithAuthor>;
  };

  const getTagPage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <IndexPage
        tag={props.match.params.tag}
        entryRepository={entryRepository}
      />
    </WithAuthor>;
  };

  const getAboutPage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <AboutPage/>
    </WithAuthor>;
  };


  //
  // const getEntryForm = () => {
  //   scrollUp();
  //   return <EntryForm entryRepository={entryRepository}/>;
  // };


  const getGallery = (props) => {
    return <Gallery id={props.match.params.id}/>;
  };

  return <BrowserRouter>
    <div className="app-container">
      <Route exact path="/" component={getIndexPage}/>
      <Route exact path="/about" component={getAboutPage}/>
      <Route exact path="/archive" component={getArchivePage}/>
      <Route path="/archive/:friendlyUrl" component={getEntryPage}/>
      <Route exact path="/tags" component={getTagsPage}/>
      <Route exact path="/tags/:tag" component={getTagPage}/>

      {/*<Route path="/entries/new" component={getEntryForm}/>*/}
      <Route path="/gallery/:id" component={getGallery}/>
    </div>
  </BrowserRouter>;
};