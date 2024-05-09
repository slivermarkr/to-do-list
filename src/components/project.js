class Project {
  constructor(input) {
    this.title = input
    this.tasks = []
  }
}
const takeTask = {
  acceptTask(name , desc, prio) {
    const task = new Task(name,desc,prio);
    this.tasks.push(task);
  }
}


class Task {
  constructor(name,description,priority){
    this.name = name
    this.description = description
    this.priority = priority
  }
}

Object.assign(Project.prototype,takeTask);

function CreateProject(input = "Today") {
  const project = new Project(input);

  const getProjectTitle = () =>  project.title

  const getProjectTasks = () => project.tasks;

  return {
    project,
    getProjectTasks,
    getProjectTitle
  }
}

const me = CreateProject();