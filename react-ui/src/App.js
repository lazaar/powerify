// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import About from './containers/About';
import ProductsPage from './containers/ProductsPage';
import Settings from './containers/Settings';
import Product from './containers/Product';

const App = () =>
  <div>
    <Route exact path="/" component={ProductsPage} />
    <Route exact path="/about" component={About} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/product" component={Product} />
  </div>;

export default App;
