import React from 'react';

import IndexPage from "./components/views/indexPage";
import EntryPage from "./components/views/entryPage";
import TagsPage from "./components/views/tagsPage";
import InfoPage from "./components/views/infoPage";

import EntryForm from "./components/forms/entryForm";


import Gallery from "./components/views/gallery/index";
// import EntryForm from './components/forms/entryForm';
import WithAuthor from "./components/higherOrder/withAuthor";
import EntryRepository from "./components/repositories/entryRepository";

import {BrowserRouter, Route} from "react-router-dom";



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

  const getInfoPage = (props) => {
    scrollUp();
    return <WithAuthor
      pathname={props.location.pathname}>
      <InfoPage pathname={props.location.pathname}/>
    </WithAuthor>;
  };

  const getEntryForm = (props) => {
    scrollUp();
    return <EntryForm
      pathname={props.location.pathname}
      entryRepository={entryRepository}
    />;
  };



  const getGallery = (props) => {
    return <Gallery id={props.match.params.id}/>;
  };

  return <BrowserRouter>
    <div className="app-container">
      <Route exact path="/" component={getIndexPage}/>
      <Route exact path="/about" component={getInfoPage}/>
      <Route exact path="/archive" component={getArchivePage}/>
      <Route exact path="/form" component={getEntryForm}/>
      <Route path="/archive/:friendlyUrl" component={getEntryPage}/>
      <Route exact path="/tags" component={getTagsPage}/>
      <Route exact path="/tags/:tag" component={getTagPage}/>
      <Route exact path="/resume" component={getInfoPage}/>
      <Route path="/gallery/:id" component={getGallery}/>
    </div>
  </BrowserRouter>;
};