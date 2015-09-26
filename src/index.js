import 'babel-core/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';
import HomePage from './components/pages/HomePage';
import CounterPage from './components/pages/CounterPage';

const history = new BrowserHistory();
const store = configureStore();

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route component={App}>
	        <Route path="/" component={HomePage} />
	        <Route path="/counter" component={CounterPage} />
	        <Route path="/home" component={HomePage} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);
