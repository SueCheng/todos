import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { TodoList } from './todoList';
import { reducers } from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const initialTodo = {
  id: 0,
  title: 'Hello World',
  completed: false
};
const OriginalApp = () => (
  <Provider store={store}>
    <TodoList initialTodo={initialTodo} />
  </Provider>
);

export const App = hot(OriginalApp);
