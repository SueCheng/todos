import { Todo, Action, ActionTypes } from '../actions';
import uniqueId from '../utilities/uniqueId';

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.addTodo:
      return [...state, action.payload];
    case ActionTypes.deleteTodo:
      return state.filter(todo => todo.id !== action.payload);
    case ActionTypes.fetchTodos:
      const uniqueIdArr = action.payload.map((todo, index) => ({
        ...todo,
        id: uniqueId()
      }));
      return [...state, ...uniqueIdArr];
    default:
      return state;
  }
};
