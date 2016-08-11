/**
 * index.tsx
 *
 * This is the entry file for the application
 */

// tslint:disable-next-line
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

import App from './containers/App/App';
import Hello from './components/Hello/Hello';
import DevTools from './containers/DevTools/DevTools';

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

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render((
    <Provider store={ store }>
      <div>
        <Router history={ history }>
          <Route path='/' component={App}>
            <Route path='Hello' component={Hello}/>
          </Route>
        </Router>
        <DevTools />
      </div>
    </Provider>
  ), document.getElementById('app'));
} else {
  ReactDOM.render((
    <Provider store={ store }>
      <div>
        <Router history={ history }>
          <Route path='/' component={App}>
            <Route path='Hello' component={Hello}/>
          </Route>
        </Router>
      </div>
    </Provider>
  ), document.getElementById('app'));
}
