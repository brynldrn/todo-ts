import React, { useRef, useState } from 'react'
import { ReactComponent as Delete } from '@material-design-icons/svg/filled/delete.svg';
import { ReactComponent as Edit } from '@material-design-icons/svg/filled/edit.svg';

type TodoProps = {
  task: string,
  index: number,
  dispatch: Function
}

function Todo({ task, index, dispatch }: TodoProps) {
  const [editOn, setEditOn] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: index });
  }

  const handleDoubleClick = () => {
    (inputRef.current as HTMLInputElement).focus()
    setEditOn(!editOn)
  }

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      dispatch({ type: 'update', payload: { index, newValue: (e.target as HTMLInputElement).value } });
      (inputRef.current as HTMLInputElement).blur()
    }
  }

  return (
    <article className='shadow-md bg-gray-400 text-zinc-900 rounded-md p-5 mb-4 flex flex-row flex-wrap justify-between items-center' onDoubleClick={handleDoubleClick}>
      <h2 className={`${editOn ? 'hidden' : 'block'} font-semibold`}>{task}</h2>
      <input autoFocus ref={inputRef} type="text" defaultValue={task} className={`${editOn ? 'block' : 'hidden'} p-2 text-zinc-800 rounded-xl w-11/12`} onKeyDown={handleInputSubmit} onBlur={() => setEditOn(false)} />
      <div>
        <button className='lg:hidden' onClick={handleDoubleClick}><Edit /></button>
        <button onClick={handleDelete}><Delete /></button>
      </div>
    </article>
  )
}

export default Todo