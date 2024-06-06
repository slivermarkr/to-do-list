export default class List {
  constructor() {
    this.PROJECTLIST = [];
  }
  addProject(title) {
    const project = new Project(title);
    this.PROJECTLIST.push(project);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.PROJECTLIST));
  }
}

export class Project {
  constructor(projectTitle) {
    this.title = projectTitle;
    this.TASKLIST = [];
  }
  addTask(taskName, taskDescription, taskPriorityLevel, taskDeadline) {
    const task = new Task(
      taskName,
      taskDescription,
      taskPriorityLevel,
      taskDeadline
    );
    this.TASKLIST.push(task);
  }
}

export class Task {
  constructor(taskName, taskDescription, taskPriorityLevel, taskDeadline) {
    this.name = taskName;
    this.description = taskDescription;
    this.priorityLevel = taskPriorityLevel;
    this.deadline = taskDeadline;
  }
}
