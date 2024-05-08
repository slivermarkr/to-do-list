class Project {
  constructor(title) {
   this.title = title
   this.array = []
  }
 }
class Tasks {
 constructor(name,description,priority) {
  this.name = name;
  this.description = description;
  this.priority = priority
 }
}
const getProjectTask = {
  getTask(name,description,priority) {
    const newTask = new Tasks(name,description,priority)
    this.array.push(newTask);
    console.log(this.array);
  }
}

Object.assign(Project.prototype, getProjectTask);

const project = new Project("Today")
project.getTask("Water the plants","or it'll die","High");
project.getTask("Water the plants","or it'll die","High");
project.getTask("Water the plants","or it'll die","High");
project.getTask("Water the plants","or it'll die","High");