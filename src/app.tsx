import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { TodoList } from './todoList';
import { reducers } from './reducers';
import uniqueId from './utilities/uniqueId';

const initialTodo = {
  id: uniqueId(),
  title: 'Hello World',
  completed: false
};

const store = createStore(
  reducers,
  { todoList: [initialTodo] },
  applyMiddleware(thunk)
);

const OriginalApp = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

export const App = hot(OriginalApp);
