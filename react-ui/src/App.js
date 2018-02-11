// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import About from './containers/About';
import ProductsPage from './containers/ProductsPage';
import Settings from './containers/Settings';
import Product from './containers/Product';
import Review from './containers/Review'

const App = () =>
  <div>
    <Route exact path="/" component={ProductsPage} />
    <Route exact path="/about" component={About} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/product/:productId" component={Product} />
      <Route exact path="/review/:shop/:reviewProductId" component={Review} />
  </div>;

export default App;
