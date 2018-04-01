// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './containers/index';
import Settings from './containers/Settings';
import Product from './containers/Product';
import Review from './containers/Review'

const App = () =>
  <div>
    <Route exact path="/" component={IndexPage} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/product/:productId" component={Product} />
      <Route exact path="/review/:shop/:reviewProductId" component={Review} />
  </div>;

export default App;
