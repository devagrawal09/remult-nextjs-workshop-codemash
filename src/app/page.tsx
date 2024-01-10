"use client"

import { FormEvent, useEffect, useState } from "react"
import { Task, TasksController } from "@/shared/Task"
import { remult } from "remult"

const taskRepo = remult.repo(Task)

export default function TodosPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [hideCompleted, setHideCompleted] = useState(false)

  const fetchTasks = () => {}

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await taskRepo.insert({ title: newTaskTitle })
      setNewTaskTitle("")
      fetchTasks()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    TasksController.setAllCompleted(completed)
  }

  useEffect(() => {
    const cleanup = taskRepo
      .liveQuery({
        where: hideCompleted ? { completed: false } : undefined,
        orderBy: { createdAt: "asc" }
      })
      .subscribe((data) => {
        console.log(data)
        setTasks(data.applyChanges)
      })

    return cleanup
  }, [hideCompleted])

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
      await task.toggleCompleted()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const saveTask = async () => {
    try {
      task.title = title
      await taskRepo.save(task)
      fetchTasks()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const deleteTask = async () => {
    try {
      await taskRepo.delete(task)
      fetchTasks()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
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
