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

function InputController() {
 const LIST = new List();

 const getLIST = () => LIST

 const getProjectLIST = () => LIST.PROJECTLIST;

 const printTaskLIST = (index) => {
  console.log(getProjectLIST()[index].TASKSLIST)
 };

 const addProjectTitle = (title) => {
  LIST.addProject(title);
  printProjectList();
 }

 const printProjectList = () => {
  console.log(LIST.PROJECTLIST)
 }

 const addTaskInfo = (projectIndex,taskName,taskDesc,taskStatus) => {
  LIST.PROJECTLIST[projectIndex].addTask(taskName,taskDesc,taskStatus);
  printTaskLIST(projectIndex)
 }

 return {
  getLIST,
  getProjectLIST,
  addProjectTitle,
  addTaskInfo
 }
}

const me = InputController();