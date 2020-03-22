import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ProgressPlugin } from 'webpack';
import { connect } from 'react-redux';
import { StoreState } from './reducers';
import { Todo, addTodo, deleteTodo, fetchTodos } from './actions';
import { space, layout, color } from 'styled-system';
import { ThemeProvider } from 'emotion-theming';
import { ThemeProps, theme } from './theme';
import uniqueId from './utilities/uniqueId';

const green = 'green';
const BlockLable = styled.label({
  display: 'block'
});
const GreenBorderInput = styled.input({
  border: `1px solid ${green}`
});
const RedBorderButton = styled.button({
  border: `1px solid red`
});
const RedBorderBlockButton = BlockLable.withComponent(RedBorderButton);

interface TodoListProps {
  todoList: Todo[];
  addTodo: Function;
  deleteTodo: Function;
  fetchTodos: Function;
  maximumListAmount?: number; // for using default props purpose, didn't make it really work
}
type BoxProps = {
  theme: ThemeProps;
};

const Box = styled.div(
  {
    boxSizing: 'border-box'
  },
  space,
  layout,
  color
);

const _TodoList: React.FunctionComponent<TodoListProps> = ({
  todoList,
  addTodo,
  deleteTodo,
  fetchTodos,
  maximumListAmount = 12,
  children
}) => {
  const [newTodo, setNewTodo] = React.useState<Todo>({
    id: -1,
    title: '',
    completed: false
  });

  const onChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewTodo({ ...newTodo, title: newValue });
  };

  const onChangeTodoCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setNewTodo({ ...newTodo, completed: newValue });
  };

  const onAddTodo = () => {
    addTodo({ ...newTodo, id: uniqueId() });
    setNewTodo({ id: -1, title: '', completed: false });
  };

  const onDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const renderList = () => {
    if (todoList.length === 0) return null;
    return todoList.map(todo => (
      <li key={todo.id}>
        {todo.title}{' '}
        <span>{todo.completed ? 'Completed' : 'Not Completed'}</span>
        <RedBorderBlockButton onClick={() => onDeleteTodo(todo.id)}>
          delete
        </RedBorderBlockButton>
      </li>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box color="black" bg="green" mb={[0, 3, 5]} width={[1, 1 / 2, 1 / 4]}>
        {maximumListAmount}
      </Box>
      <RedBorderBlockButton onClick={() => fetchTodos()}>
        Fetch
      </RedBorderBlockButton>
      <BlockLable htmlFor="title">
        Please input new todo Title:
        <GreenBorderInput
          id="title"
          type="text"
          placeholder={'todo title here'}
          onChange={onChangeTodoTitle}
          value={newTodo.title}
        />
      </BlockLable>
      <BlockLable htmlFor="completed">
        Please input new todo Completed:
        <GreenBorderInput
          id="completed"
          type="radio"
          onChange={onChangeTodoCompleted}
          checked={newTodo.completed}
        />
        Completed
      </BlockLable>
      <RedBorderButton onClick={onAddTodo}>Add New Note</RedBorderButton>
      <br />
      <ul>{renderList()}</ul>
    </ThemeProvider>
  );
};
const mapStateToProps = ({ todoList }: StoreState): { todoList: Todo[] } => {
  return { todoList };
};
export const TodoList = connect(mapStateToProps, {
  addTodo,
  deleteTodo,
  fetchTodos
})(_TodoList);

// const color = 'white';
// const titleStyle = css({
//   boxSizing: 'border-box',
//   width: 300,
//   height: 200
// });
// const subtitleStyle = css`
//   padding: 32px;
//   background-color: hotpink;
//   font-size: 24px;
//   border-radius: 4px;
//   &:hover {
//     color: ${color};
//   }
// `;
// const Link = styled('a')`
//   color: red;
// `;
// const NotALink = styled('div')`
//   color: red;
// `;
// const AnotherLink = NotALink.withComponent('a');

// type ImageProps = {
//   src: string;
//   width: number;
// };

// const Image0 = styled('div')`
//   width: ${(props: ImageProps) => props.width};
//   background: url(${(props: ImageProps) => props.src}) center center;
//   background-size: contain;
// `;

// const Image1 = styled('div')(
//   {
//     backgroundSize: 'contain'
//   },
//   (props: ImageProps) => ({
//     width: props.width,
//     background: `url(${props.src}) center center`
//   })
// );

// const Image2 = styled('div')<ImageProps>(
//   {
//     backgroundSize: 'contain'
//   },
//   props => ({
//     width: props.width,
//     background: `url(${props.src}) center center`
//   })
// );

// const Image3 = styled.img<ImageProps>`
//   width: ${(props: ImageProps) => props.width}px;
//   background: url(${(props: ImageProps) => props.src}) center center;
//   background-size: contain;
// `;
// type ComponentProps = {
//   className?: string;
//   label: string;
// };
// type StyledComponentProps = {
//   bgColor: string;
// };
// const DummyComp: React.SFC<ComponentProps> = ({ label, className }) => (
//   <div className={className}>{label}</div>
// );

// const StyledDummyComp = styled(DummyComp)<StyledComponentProps>(
//   {
//     color: 'red',
//     '@media(min-width:420px)': {
//       color: 'orange'
//     }
//   },
//   props => ({
//     background: props.bgColor
//   })
// );

// export const TodoList = () => (
//   <React.Fragment>
//     <h1 css={titleStyle}>Hello</h1>
//     <div css={subtitleStyle}>Hover to change color</div>
//     <AnotherLink href="#">Click me</AnotherLink>
//     <Image3 src="https://via.placeholder.com/150" width={150} />
//     <StyledDummyComp
//       label="Styled Dummy Comp accept className"
//       bgColor="blue"
//     />
//   </React.Fragment>
// );

// interface TodoListState {
//     todoList: Todo[];
//     newTodo: Todo;
//   }
// export class TodoList extends React.Component<TodoListProps, TodoListState> {
//   constructor(props: TodoListProps) {
//     super(props);
//     this.state = {
//       todoList: [props.initialTodo],
//       newTodo: { id: -1, title: '', completed: false }
//     };
//     this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
//     this.onChangeTodoProgress = this.onChangeTodoProgress.bind(this);
//     this.onAddTodo = this.onAddTodo.bind(this);
//     this.onDeleteTodo = this.onDeleteTodo.bind(this);
//     this.renderList = this.renderList.bind(this);
//     this.onFetch = this.onFetch.bind(this);
//   }
//   static defaultProps = {
//     maximumListAmount: 10
//   };

//   async onFetch() {
//     const { todoList } = this.state;
//     const response = await axios.get<Todo[]>(url);
//     this.setState({
//       todoList: [...todoList, ...response.data]
//     });
//   }
//   onChangeTodoTitle(e: React.ChangeEvent<HTMLInputElement>) {
//     const newValue = e.target.value;
//     this.setState(prevState => ({
//       newTodo: {
//         ...prevState.newTodo,
//         title: newValue
//       }
//     }));
//   }
//   onChangeTodoProgress(e: React.ChangeEvent<HTMLInputElement>) {
//     const newValue = e.target.value;
//     this.setState(prevState => ({
//       newTodo: {
//         ...prevState.newTodo,
//         completed: newValue !== ''
//       }
//     }));
//   }
//   onAddTodo() {
//     const { todoList, newTodo } = this.state;
//     this.setState({
//       todoList: [...todoList, { ...newTodo, id: todoList.length }],
//       newTodo: { id: -1, title: '', completed: false }
//     });
//   }
//   onDeleteTodo(id: number) {
//     const { todoList, newTodo } = this.state;
//     todoList.filter(todo => todo.id !== id);
//     this.setState({ todoList: todoList.filter(todo => todo.id !== id) });
//   }
//   renderList() {
//     const { todoList } = this.state;
//     if (todoList.length === 0) return null;
//     return todoList.map(todo => (
//       <li key={todo.id}>
//         {todo.title}{' '}
//         <span>{todo.completed ? 'Completed' : 'Not Completed'}</span>
//         <RedBorderBlockButton onClick={() => this.onDeleteTodo(todo.id)}>
//           delete
//         </RedBorderBlockButton>
//       </li>
//     ));
//   }
//   render() {
//     const { newTodo } = this.state;
//     return (
//       <>
//         <RedBorderBlockButton onClick={this.onFetch}>
//           Fetch
//         </RedBorderBlockButton>
//         <BlockLable htmlFor="title">
//           Please input new todo Title:
//           <GreenBorderInput
//             id="title"
//             type="text"
//             placeholder={'todo title here'}
//             onChange={this.onChangeTodoTitle}
//             value={newTodo.title}
//           />
//         </BlockLable>
//         <BlockLable htmlFor="completed">
//           Please input new todo Progress:
//           <GreenBorderInput
//             id="completed"
//             type="text"
//             placeholder={'todo completed here'}
//             onChange={this.onChangeTodoProgress}
//             value={newTodo.completed ? 'Completed' : 'Not Completed'}
//           />
//         </BlockLable>
//         <RedBorderButton onClick={this.onAddTodo}>Add New Note</RedBorderButton>
//         <br />
//         <ul>{this.renderList()}</ul>
//       </>
//     );
//   }
// }
