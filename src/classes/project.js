import Task from './task.js'
export default class Project {
 constructor(title) {
  this.title = title
  this.TASKSLIST = []
 }
 addTask(taskName,taskDescription,priorityLevel,deadline) {
  const task = new Task(taskName,taskDescription,priorityLevel,deadline);
  this.TASKSLIST.push(task);
 }
}