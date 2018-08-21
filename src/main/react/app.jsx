import React from 'react';
import SmallMultiEntryView from "./components/views/smallMultiEntryView";

import IndexPage from "./components/views/indexPage";
import EntryPage from "./components/views/entryPage";
import Gallery from "./components/views/gallery/index";

import EntryForm from './components/forms/entryForm';
import WithAuthor from "./components/higherOrder/withAuthor";
import WithColumns from "./components/higherOrder/withColumns";
import WithEntries from "./components/higherOrder/withEntries";
import EntryRepository from "./components/repositories/entryRepository";
import {MuiThemeProvider} from "material-ui";
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
        isDetailed={false}
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

  const getEntryForm = () => {
    scrollUp();
    return <WithColumns>
      <WithEntries entryRepository={entryRepository}>
        <EntryForm entryRepository={entryRepository}/>
      </WithEntries>
    </WithColumns>
  };

  const getSmallMultiEntry = () => {
    scrollUp();
    return <WithColumns>
      <WithEntries entryRepository={entryRepository}>
        <SmallMultiEntryView/>
      </WithEntries>
    </WithColumns>;
  };

  const getGallery = (props) => {
    return <Gallery id={props.match.params.id}/>;
  };

  return <MuiThemeProvider>
    <BrowserRouter>
      <div className="app-container">
        <Route exact path="/" component={getIndexPage}/>
        <Route exact path="/archive" component={getArchivePage}/>
        <Route path="/archive/:friendlyUrl" component={getEntryPage}/>

          <Route path="/small-list" component={getSmallMultiEntry}/>
          <Route path="/entries/new" component={getEntryForm}/>
          <Route path="/gallery/:id" component={getGallery}/>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
;
};