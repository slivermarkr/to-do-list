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

function FunctionController() {
 const LIST = new List();

 LIST.addProject('Today')
 LIST.addProject('Tomorrow')
 LIST.addProject('Next Week')

 const getLIST = () => LIST

 const getProjectLIST = () => LIST.PROJECTLIST;

 const printTaskLIST = (index) => {
  console.log(getProjectLIST()[index].TASKSLIST)
 };


 const addProjectTitle = (title) => {
  LIST.addProject(title);
  console.log(getProjectLIST());
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

function ScreenController() {
 const LIST = FunctionController();

 const createProjectBtn = document.querySelector('.create-project-btn');
 const titleModal = document.querySelector('.title-modal');
 const addProjectBtn = document.querySelector('.create-title');

 const createProject = () => {
  const title = document.querySelector('#title').value;
  console.log(title);
  LIST.getLIST().addProject(title);
  console.log(LIST.getLIST());
 }

 createProjectBtn.addEventListener('click',() => {
  titleModal.style.display = 'block';
 })

 addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createProject()
  titleModal.style.display = "none";
 })
}
const me = ScreenController();