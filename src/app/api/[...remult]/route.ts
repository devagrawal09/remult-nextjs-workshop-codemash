import { remultNextApp } from "remult/remult-next"
import { Task } from "../../../shared/Task"
import { TasksController } from "../../../shared/TaskController"
import { createPostgresDataProvider } from "remult/postgres"
import { Rest } from "ably/promises"
import { AblySubscriptionServer } from "remult/ably"
import { DataProviderLiveQueryStorage } from "remult/server"
import { auth } from "@clerk/nextjs"

const dataProvider = createPostgresDataProvider({
  connectionString: process.env["DATABASE_URL"]
})

const api = remultNextApp({
  entities: [Task],
  controllers: [TasksController],

  getUser: async () => {
    const { userId } = auth()
    if (userId) return { id: userId }
  }

  // dataProvider,
  // subscriptionServer: new AblySubscriptionServer(
  //   new Rest(process.env["ABLY_API_KEY"]!)
  // ),
  // liveQueryStorage: new DataProviderLiveQueryStorage(dataProvider)
})

export const { POST, PUT, DELETE, GET } = api
