import { Task, TasksController } from "@/shared/Task"
import { remultNextApp } from "remult/remult-next"

const api = remultNextApp({
  entities: [Task],
  controllers: [TasksController]
})

export const { POST, PUT, DELETE, GET } = api
