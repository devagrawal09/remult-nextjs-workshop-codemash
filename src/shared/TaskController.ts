import { Allow, BackendMethod, remult } from "remult"
import { Task } from "./Task"

export class TasksController {
  @BackendMethod({ allowed: Allow.authenticated })
  static async setAllCompleted(completed: boolean) {
    const taskRepo = remult.repo(Task)

    for (const task of await taskRepo.find({
      where: { userId: remult.user!.id }
    })) {
      await taskRepo.save({ ...task, completed })
    }
  }
}
