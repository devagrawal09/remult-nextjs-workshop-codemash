import { Task, TasksController } from "@/shared/Task"
import { auth } from "@clerk/nextjs"
import { remultNextApp } from "remult/remult-next"

const api = remultNextApp({
  entities: [Task],
  controllers: [TasksController],
  async getUser() {
    const { userId } = auth()
    if (userId) return { id: userId }
  }
})

export const { POST, PUT, DELETE, GET } = api
