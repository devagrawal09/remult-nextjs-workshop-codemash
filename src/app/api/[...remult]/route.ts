import { Task } from "@/shared/Task"
import { remultNextApp } from "remult/remult-next"

const api = remultNextApp({
  entities: [Task]
})

export const { POST, PUT, DELETE, GET } = api
