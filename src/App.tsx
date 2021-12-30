import React, { useReducer, useState } from 'react';
import './App.css';
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
    payload: string
  } |
  {
    type: 'delete',
    payload: number
  }
  
  function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
      case "add":
        return { todos: [...state.todos, action.payload] }
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
    <div className="w-screen h-screen bg-white dark:bg-zinc-900 todo-app text-black dark:text-zinc-300 p-5">
      <h1 className='text-center font-bold text-lg'>Todo App</h1>
      <input className='w-full mt-4 p-2 text-zinc-800 rounded-xl' type="text" name="todo-item" id="todo-item" placeholder='What should we do today?' onKeyDown={handleInputSubmit} />
      <section className='mt-5 todo-container'>
        {
          state?.todos && state.todos.map((todo, index) => <Todo key={index} task={todo} />)
        }
      </section>
    </div>
  );
}

export default App;