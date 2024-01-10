import {
  BackendMethod,
  Entity,
  Fields,
  IdEntity,
  Validators,
  remult
} from "remult"

@Entity(`tasks`, {
  allowApiCrud: true
})
export class Task extends IdEntity {
  @Fields.cuid()
  id = ``

  @Fields.string<Task>({
    validate: (task) => {
      if (task.title.length < 3) throw new Error(`Title is too short!`)
    }
  })
  title = ``

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date

  @BackendMethod({ allowed: true })
  toggleCompleted() {
    console.log(`toggleCompleted`)
    this.completed = !this.completed
    return this.save()
  }
}

export class TasksController {
  @BackendMethod({ allowed: true })
  static async setAllCompleted(completed: boolean) {
    const taskRepo = remult.repo(Task)

    const tasks = await taskRepo.find()
    await Promise.all(
      tasks.map(async (task) => {
        task.completed = completed
        await task.save()
      })
    )
  }
}
