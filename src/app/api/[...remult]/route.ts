import { Task, TasksController } from "@/shared/Task"
import { remultNextApp } from "remult/remult-next"

const api = remultNextApp({
  entities: [Task],
  controllers: [TasksController],
  async getUser(req) {
    return { id: `345`, roles: ["admin"] }
  }
})

export const { POST, PUT, DELETE, GET } = api
