import { Todo, Action, ActionTypes } from '../actions';

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.addTodo:
      return [...state, action.payload];
    case ActionTypes.deleteTodo:
      return state.filter(todo => todo.id !== action.payload);
    case ActionTypes.fetchTodos:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
