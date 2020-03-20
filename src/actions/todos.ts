import axios from 'axios';
import { Dispatch } from 'redux';
import {
  Todo,
  ActionTypes,
  AddTodoAction,
  DeleteTodoAction,
  FetchTodosAction
} from './types';

const url = 'https://jsonplaceholder.typicode.com/todos';

export const addTodo = (todo: Todo): AddTodoAction => {
  return {
    type: ActionTypes.addTodo,
    payload: todo
  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });
  };
};
