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

 LIST.addProject('Today');
 LIST.addProject('Tomorrow');
 LIST.addProject('Next Week');

const getLIST = () => LIST

 const getProjectLIST = () => LIST.PROJECTLIST;

 const printTaskLIST = (index) => {
  console.log(getProjectLIST()[index])
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
 const taskModal = document.querySelector('.task-modal')
 const addProjectBtn = document.querySelector('.create-title');
 const projectListDiv = document.querySelector('.side-bar');
 const taskListDiv = document.querySelector('.project-content-wrapper');
 const projectTitleDiv = document.querySelector('.project-title h2');
 const addtaskBtn = document.querySelector('add-task-btn');

 const createProject = () => {
  const title = document.querySelector('#title').value;
  console.log(title);
  LIST.getLIST().addProject(title);
  console.log(LIST.getLIST());
 }

 const updateProject = ()  => {
  LIST.getProjectLIST().forEach((project,index) => {
   const list = document.createElement('li');
   const projectBtn = document.createElement('button');
   projectBtn.classList.add("projects");
   projectBtn.dataset.index = index;
   projectBtn.textContent = project.title
   list.appendChild(projectBtn);
   projectListDiv.appendChild(list);
   return projectListDiv;
  })
 }
 
 const createAddTaskButton = (index) => { 
    const project = LIST.getProjectLIST()[index];
    const addTaskBtn = document.createElement('button');
    addProjectBtn.id = project.title
    addTaskBtn.classList.add('add-task-btn');
    addTaskBtn.dataset.index = index
    addTaskBtn.textContent = "+";
    projectTitleDiv.textContent = project.title
    taskListDiv.appendChild(addTaskBtn);
  }

 createProjectBtn.addEventListener('click',() => {
  titleModal.style.display = 'block';
 })

 addProjectBtn.addEventListener('click', (e) => {
  const index = LIST.getProjectLIST().length
  e.preventDefault();
  projectListDiv.textContent = ""
  createProject()
  updateProject();
  taskListDiv.textContent = "";
  createAddTaskButton(index);
  titleModal.style.display = "none";
 })

 projectListDiv.addEventListener('click', (e) => {
  if(!e.target.classList.contains('projects')) return;
  const index = e.target.dataset.index
  projectTitleDiv.textContent = "";
  taskListDiv.textContent = "";
  createAddTaskButton(index);
 })

 taskListDiv.addEventListener('click' ,(e) => {
  if(!e.target.classList.contains('add-task-btn')) return;
  taskModal.style.display = 'block';
  taskListDiv.appendChild(taskModal);
 })

//initial update of the screen
taskListDiv.textContent = "";
updateProject()
}
const init = ScreenController();
