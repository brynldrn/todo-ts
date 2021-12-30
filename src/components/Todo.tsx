import React from 'react'

type TodoProps = {
  task: String
}

function Todo({ task }: TodoProps) {
  return (
    <div>{task}</div>
  )
}

export default Todo