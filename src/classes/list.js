import Project from './project.js'

export default class List {
 constructor() {
  this.PROJECTLIST = []
 }
 addProject(projectTitle) {
  const project = new Project(projectTitle)
  this.PROJECTLIST.push(project);
 }
}