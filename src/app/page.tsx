"use client"

import { FormEvent, useEffect, useState } from "react"
import { Task } from "@/shared/Task"

export default function TodosPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [hideCompleted, setHideCompleted] = useState(false)

  const fetchTasks = () => {
    setTasks([
      {
        title: `Clone the repository`,
        completed: true,
        id: `1`
      },
      {
        title: `Install dependencies`,
        completed: true,
        id: `2`
      },
      {
        title: `Run development server`,
        completed: true,
        id: `3`
      },
      {
        title: `Add a new task`,
        completed: false,
        id: `4`
      }
    ])
  }

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setNewTaskTitle("")
    } catch (error: any) {
      alert(error.message)
    }
  }

  const setAllCompleted = async (completed: boolean) => {}

  useEffect(() => fetchTasks(), [])

  return (
    <div>
      <h1>Todos</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
        {tasks.map((task) => (
          <TodoComponent key={task.id} task={task} fetchTasks={fetchTasks} />
        ))}
        <div>
          <button onClick={() => setHideCompleted((v) => !v)}>
            {hideCompleted ? `Show Completed` : `Hide Completed`}
          </button>
          <button onClick={() => setAllCompleted(true)}>
            Set All Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set All Uncompleted
          </button>
        </div>
      </main>
    </div>
  )
}

function TodoComponent({
  task,
  fetchTasks
}: {
  task: Task
  fetchTasks: () => any
}) {
  const [title, setTitle] = useState(task.title)

  const toggleCompleted = async () => {
    try {
    } catch (error: any) {
      alert(error.message)
    }
  }

  const saveTask = async () => {
    try {
    } catch (error: any) {
      alert(error.message)
    }
  }

  const deleteTask = async () => {
    try {
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
      />
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      {title !== task.title ? <button onClick={saveTask}>Save</button> : null}
      <button onClick={deleteTask}>Delete</button>
    </div>
  )
}
