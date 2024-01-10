import {
  Allow,
  BackendMethod,
  Entity,
  Fields,
  IdEntity,
  Validators,
  remult
} from "remult"

@Entity<Task>(`tasks`, {
  allowApiCrud: Allow.authenticated,
  allowApiDelete: (task) => task?.userId === remult.user?.id,
  allowApiUpdate: (task) => task?.userId === remult.user?.id,
  allowApiInsert: (task) => task?.userId === remult.user?.id,
  apiPrefilter: () => (remult.user?.id ? { userId: remult.user.id } : {})
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

  @Fields.string({
    validate: Validators.required
  })
  userId = ""

  @BackendMethod({ allowed: (task) => task?.userId === remult.user?.id })
  toggleCompleted() {
    console.log(`toggleCompleted`)
    this.completed = !this.completed
    return this.save()
  }
}

export class TasksController {
  @BackendMethod({ allowed: Allow.authenticated })
  static async setAllCompleted(completed: boolean) {
    const taskRepo = remult.repo(Task)

    const tasks = await taskRepo.find({ where: { userId: remult.user!.id } })
    await Promise.all(
      tasks.map(async (task) => {
        task.completed = completed
        await task.save()
      })
    )
  }
}
