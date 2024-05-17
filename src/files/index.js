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
  this.date = date
 }
}

function SetController() {
 const LIST = new List();

 LIST.addProject('Today')
 LIST.addProject('Home')
 LIST.addProject('Work')

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

 const createTaskInstance = (index,name,desc,priority,date) => {
  LIST.PROJECTLIST[index].addTask(name,desc,priority,date);
  printTaskLIST(index);
 }

 return {
  getLIST,
  getProjectLIST,
  createProjectInstance,
  createTaskInstance,
 }
}

function ScreenController() {
 const LIST = SetController();
 let currrentIndex = 0;

 const getCurrentIndex = () => currrentIndex;

 const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const mont = date.getMonth();
  const year = date.getFullYear();
  
  return `${mont}/${day}/${year}`
 }

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

const addTaskToProject = (projectIndex) => {
  const taskName = document.querySelector('#task-name').value;
  const taskDescription = document.querySelector('#task-desc').value;
  const priorities = document.querySelectorAll('.priorityLevel');
  let priorityLevel;

  priorities.forEach(priorityBtn => {
    if(priorityBtn.checked) priorityLevel = priorityBtn.id
  })

  LIST.createTaskInstance(projectIndex,taskName,taskDescription,priorityLevel,getCurrentDate())
}

const updateTasksOnScreen = (index) => {
  const TASKS = LIST.getProjectLIST()[index].TASKSLIST
  TASKS.forEach((task,taskIndex) => {
    const list = document.createElement('li');
    const eachTaskDiv = document.createElement('div');
    eachTaskDiv.classList.add('task');
    eachTaskDiv.dataset.index = taskIndex;
    const taskNameDiv = document.createElement('div');
    const taskDescDiv = document.createElement('div');
    const taskPriorityLevelDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    taskNameDiv.textContent = task.name;
    taskDescDiv.textContent = task.description;
    taskPriorityLevelDiv.textContent = task.priorityLevel;
    dateDiv.textContent = task.date;
    eachTaskDiv.appendChild(taskNameDiv)
    eachTaskDiv.appendChild(taskDescDiv)
    eachTaskDiv.appendChild(taskPriorityLevelDiv)
    eachTaskDiv.appendChild(dateDiv)
    list.appendChild(eachTaskDiv)
    taskList.appendChild(list);
    taskListDiv.appendChild(taskList)
  })
}

 const addProjectBtn = document.querySelector('.create-project-btn');
 const projectModal = document.querySelector('.title-modal');
 const createProjectBtn = document.querySelector('.create-title');
 const projectListDiv = document.querySelector('.side-bar');
 const projectTitleDiv = document.querySelector('.project-title h2');
 const taskListDiv = document.querySelector('.project-content-wrapper');
 const taskList = document.querySelector('.project-content-wrapper > ul');
 const taskModal = document.querySelector('.task-modal');


addProjectBtn.addEventListener('click' ,() => {
 projectModal.style.display = 'block'
})

createProjectBtn.addEventListener('click',(e) => {
 e.preventDefault()
 const index = LIST.getProjectLIST().length
 currrentIndex = index
 projectListDiv.textContent = ""
 addProjectToLIST();
 updateProjectScreen()
 taskListDiv.textContent = ""
 createAddTaskButton(getCurrentIndex());
 updateTasksOnScreen(getCurrentIndex());
 projectModal.style.display = 'none'
})

projectListDiv.addEventListener('click', (e) => {
 if(!e.target.classList.contains('projects')) return;
 currrentIndex = e.target.dataset.index
 projectTitleDiv.textContent = ""
 taskListDiv.textContent = ""
 taskList.textContent = ''
 createAddTaskButton(getCurrentIndex());
 updateTasksOnScreen(getCurrentIndex());
})

taskListDiv.addEventListener('click',(e) => {
 if(!e.target.classList.contains('add-task-btn')) return;
 taskModal.style.display = 'block';
 taskListDiv.appendChild(taskModal);
})

taskListDiv.addEventListener('click',(e) => {
 if(!e.target.classList.contains('create-task-btn')) return;
 e.preventDefault()
 taskList.textContent = ''
 addTaskToProject(getCurrentIndex());
 updateTasksOnScreen(getCurrentIndex());
 taskModal.style.display = 'none';
})
updateProjectScreen()
}
function taskListWrapper() {
  
}
const initialize = ScreenController();