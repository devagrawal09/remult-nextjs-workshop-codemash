const tasks = [
  {
    title: `Clone the repository`,
    completed: true,
    id: `1`
  },
  {
    title: `Install dependencies`,
    completed: true,
    id: `2`
  },
  {
    title: `Run development server`,
    completed: true,
    id: `3`
  },
  {
    title: `Add a new task`,
    completed: false,
    id: `4`
  }
]

export default function TodosPage() {
  return (
    <div>
      <h1>Todos</h1>
      <main>
        <form>
          <input placeholder="What needs to be done?" />
          <button>Add</button>
        </form>
        {tasks.map((task) => (
          <div key={task.id}>
            <input type="checkbox" checked={task.completed} />
            {task.title}
            <button>Delete</button>
          </div>
        ))}
        <div>
          <button>Hide Completed</button>
          <button>Set All Completed</button>
          <button>Set All Uncompleted</button>
        </div>
      </main>
    </div>
  )
}
