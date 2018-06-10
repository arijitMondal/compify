/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Lazada"
        defaultTitle="Lazada Online Shopping"
      >
        <meta name="description" content="product compare" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
