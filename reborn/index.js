class List {
 constructor() {
  this.PROJECTLIST = []
 }
 addProject(title) {
  const project = new Project(title);
  this.PROJECTLIST.push(project);
 }
}

class Project {
 constructor(projectTitle) {
  this.title = projectTitle
  this.TASKSLIST = []
 }
 addTask(taskName,taskDescription,taskPriorityLevel,taskDeadline) {
  const task = new Task(taskName,taskDescription,taskPriorityLevel,taskDeadline)
  this.TASKSLIST.push(task);
 }
}

class Task {
 constructor(name,desc,priorityLevel,date) {
  this.name = name
  this.description = desc
  this.priorityLevel = priorityLevel
  this.deadLine = date
 }
}

function SetController() {
 const LIST = new List();

 LIST.addProject('Today')
 LIST.addProject('Tomorrow')
 LIST.addProject('Next Week')

 const getLIST = () => LIST

 const getProjectLIST = () => LIST.PROJECTLIST;
 
 const printProjectLIST = () => {
  console.log(LIST.PROJECTLIST)
 }

 const printTaskLIST = (index) => {
  console.log(getProjectLIST()[index])
  console.log(getProjectLIST()[index].TASKSLIST)
 };

 const createProjectInstance = (title) => {
  LIST.addProject(title)
  printProjectLIST();
 }

 const createtaskInstance = (index,name,desc,priority,date) => {
  LIST.PROJECTLIST[index].addTask(name,desc,priority,date);
  printTaskLIST(index);
 }

 return {
  getLIST,
  getProjectLIST,
  createProjectInstance,
  createtaskInstance,
 }
}

function ScreenController() {
 const LIST = SetController();
 let currrentIndex = 0;

 const getCurrentIndex = () => currrentIndex;

 const addProjectToLIST = () => {
  const title = document.querySelector('#title').value;
  LIST.createProjectInstance(title);
 }

 const updateProjectScreen = () => {
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

 const addProjectBtn = document.querySelector('.create-project-btn');
 const projectModal = document.querySelector('.title-modal');
 const createProjectBtn = document.querySelector('.create-title');
 const projectListDiv = document.querySelector('.side-bar');
 const projectTitleDiv = document.querySelector('.project-title h2');
 const taskListDiv = document.querySelector('.project-content-wrapper');


addProjectBtn.addEventListener('click' ,() => {
 projectModal.style.display = 'block'
})

createProjectBtn.addEventListener('click',(e) => {
 e.preventDefault()
 projectListDiv.textContent = ""
 addProjectToLIST();
 updateProjectScreen()
 projectModal.style.display = 'none'
})

projectListDiv.addEventListener('click', (e) => {
 if(!e.target.classList.contains('projects')) return;
 currrentIndex = e.target.dataset.index
 projectTitleDiv.textContent = ""
 taskListDiv.textContent = ""
 createAddTaskButton(getCurrentIndex());
})


updateProjectScreen()
}

const initialize = ScreenController();