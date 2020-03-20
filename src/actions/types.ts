export enum ActionTypes {
  addTodo,
  deleteTodo,
  fetchTodos
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface AddTodoAction {
  type: ActionTypes.addTodo;
  payload: Todo;
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export type Action = AddTodoAction | DeleteTodoAction | FetchTodosAction;
