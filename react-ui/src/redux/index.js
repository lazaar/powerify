// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import products from './products';
import settings from './settings';

export default combineReducers({
    router: routerReducer,
    products,
    settings
});
