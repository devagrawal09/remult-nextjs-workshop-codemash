import { Allow, Entity, Fields, Validators, remult } from "remult"

@Entity<Task>("tasks", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert: (task) => task?.userId === remult.user?.id,
  allowApiUpdate: (task) => task?.userId === remult.user?.id,
  allowApiDelete: (task) => task?.userId === remult.user?.id,
  apiPrefilter: () => (remult.user?.id ? { userId: remult.user.id } : {})
})
export class Task {
  @Fields.cuid()
  id = ""

  @Fields.string<Task>({
    validate: (task) => {
      if (task.title.length < 3) throw new Error(`Title too short`)
    }
  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date

  @Fields.string({
    validate: Validators.required
  })
  userId = ""
}
