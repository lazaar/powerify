// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import About from './containers/About';
import ProductsPage from './containers/ProductsPage';
import Settings from './containers/Settings';

const App = () =>
  <div>
    <Route exact path="/" component={ProductsPage} />
    <Route exact path="/about" component={About} />
    <Route exact path="/settings" component={Settings} />
  </div>;

export default App;
