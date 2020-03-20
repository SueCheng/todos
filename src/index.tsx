import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

type todos = {
  index: number;
  content: string;
};
const root = document.querySelector('#root');
const todoList = <App />;
ReactDOM.render(todoList, root);

// // HMR interface
// if (module.hot) {
//   // Capture hot update
//   module.hot.accept("./todoList", () => {
//     const nextComponent = TodoList();

//     // Replace old content with the hot loaded one
//     document.body.replaceChild(nextComponent, todoList);

//     todoList = nextComponent;
//   });
// }

// const testDiv = document.createElement('div');
// testDiv.innerHTML = 'Hello';
// root.appendChild(testDiv);
