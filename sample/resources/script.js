class List {
 constructor() {
  this.PROJECTLIST = []
 }
 addProject(title) {
  const project = new Project(title)
  this.PROJECTLIST.push(project);
 }
}
class Project {
 constructor(title) {
  this.title = title;
  this.TASKSLIST = []
 }
 addTask(taskName,description,priorityStatus) {
  const task = new Task(taskName,description,priorityStatus)
  this.TASKSLIST.push(task)
 }
}

class Task {
 constructor(name,desc,status) {
  this.name = name
  this.desc = desc
  this.status = status
 }
}