import { createStore, compose, applyMiddleware } from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

const configure = () => {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTools || compose;
  const store = createStore(modules, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default configure;