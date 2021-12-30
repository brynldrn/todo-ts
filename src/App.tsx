import React, { useReducer } from 'react';
import Todo from './components/Todo';

function App() {
  const initialState = { todos: ['This is a todo item'] }
  type ActionType = 
  {
    type: 'add',
    payload: string
  } | 
  {
    type: 'update',
    payload: {
      index: number,
      newValue: string
    }
  } |
  {
    type: 'delete',
    payload: number
  }
  
  function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
      case "add":
        return { todos: [...state.todos, action.payload] }
      case "update":
        state.todos[action.payload.index] = action.payload.newValue
        return { todos: [...state.todos] }
      case "delete":
        return { todos: [...state.todos.filter((_, index) => index !== action.payload)] }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      dispatch({ type: 'add', payload: (e.target as HTMLInputElement).value });

      // reset input
      (e.target as HTMLInputElement).value = ''
    }
  }

  return (
    <div className="w-screen h-screen bg-white dark:bg-zinc-900 todo-app text-black dark:text-zinc-300 p-5 md:p-10">
      <div className='md:max-w-lg mx-auto'>
        <h1 className='text-center font-bold text-lg md:text-3xl'>Todo App</h1>
        <input className='w-full mt-4 md:mt-10 p-2 text-zinc-800 rounded-xl' type="text" name="todo-item" id="todo-item" placeholder='What should we do today?' onKeyDown={handleInputSubmit} />
        <div className='mt-5 italic hidden lg:block'>Double click an item to edit.</div>
        <section className='mt-5 todo-container'>
          {
            state?.todos && state.todos.map((todo, index) => <Todo key={index} index={index} task={todo} dispatch={dispatch} />)
          }
        </section>
      </div>
    </div>
  );
}

export default App;