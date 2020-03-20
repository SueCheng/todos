import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { Todo } from '../actions/types';

export interface StoreState {
  todoList: Todo[];
}
export const reducers = combineReducers<StoreState>({
  todoList: todosReducer
});
