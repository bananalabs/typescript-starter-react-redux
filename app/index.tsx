/**
 * index.tsx
 *
 * This is the entry file for the application
 */

// tslint:disable-next-line
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import root from 'window-or-global';

import App from './containers/App';
import { Hello } from '../src';


const DevTools = (process.env.NODE_ENV === 'development')
    ? require('./containers/DevTools').default
    : null;

const Store = require('./store');

const selectLocationState = () => {
    let prevRoutingState;
    return (state) => {
        const routingState = state.route; // or state.route
        if (routingState !== prevRoutingState) {
            prevRoutingState = routingState;
        }
        return prevRoutingState;
    };
};

const store = Store.configure({});

ReactDOM.render((
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <App />
        </div>
      </BrowserRouter>
      {!!DevTools ? <DevTools visibleOnLoad={true}/> : null}
    </div>
  </Provider>
), document.getElementById('app'));
