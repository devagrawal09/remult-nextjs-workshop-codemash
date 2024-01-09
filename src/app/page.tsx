"use client"

import { FormEvent, useEffect, useState } from "react"
import { remult } from "remult"
import { AblySubscriptionClient } from "remult/ably"
import { Realtime } from "ably/promises"
import { Task } from "@/shared/Task"
import { TasksController } from "@/shared/TaskController"
import { useAuth } from "@clerk/nextjs"

const taskRepo = remult.repo(Task)

export default function TodosPage() {
  const { userId } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  useEffect(() => {
    remult.apiClient.subscriptionClient = new AblySubscriptionClient(
      new Realtime({ authUrl: "/api/getAblyToken", authMethod: "POST" })
    )
  }, [])

  useEffect(() => {
    return taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { createdAt: "asc" }
        // where: { completed: true },
      })
      .subscribe((info) => setTasks(info.applyChanges))
  }, [userId])

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await taskRepo.insert({ title: newTaskTitle, userId: userId! })
      setNewTaskTitle("")
    } catch (error: any) {
      alert(error.message)
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    TasksController.setAllCompleted(completed)
  }

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
          <TodoComponent
            key={task.id}
            task={task}
            setTask={(value) =>
              setTasks((tasks) => tasks.map((t) => (t === task ? value : t)))
            }
          />
        ))}
        <div>
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
  setTask
}: {
  task: Task
  setTask: (t: Task) => any
}) {
  const setCompleted = async (completed: boolean) => {
    try {
      await taskRepo.save({ ...task, completed })
    } catch (error: any) {
      alert(error.message)
    }
  }

  const setTitle = (title: string) => setTask({ ...task, title })

  const saveTask = async () => {
    try {
      await taskRepo.save(task)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const deleteTask = async () => {
    try {
      await taskRepo.delete(task)
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <input value={task.title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={saveTask}>Save</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  )
}