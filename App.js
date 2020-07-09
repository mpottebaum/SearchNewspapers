import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import SearchContainer from './containers/SearchContainer'

console.disableYellowBox = true // disables simulator warnings in development

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <SearchContainer />
    </Provider>
  );
}
