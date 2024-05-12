class List {
 constructor() {
  this.list = []
 }
}

const addProjectTolist = {
 addProject(title) {
  const project = new Project(title)
  this.list.push(project);
 }
}

const getListProjects = {
 getList() {
  return this.list
 }
}
Object.assign(List.prototype,addProjectTolist);
Object.assign(List.prototype,getListProjects);

class Project {
 constructor(title) {
  this.title = title
  this.tasks = []
 }
}

const addTaskToProject = {
 addTask(name,description) {
  const task = new Task(name,description,);
  this.tasks.push(task);
 }
}
Object.assign(Project.prototype,addTaskToProject);

class Task {
 constructor(name,description) {
  this.name = name
  this.description = description
  this.priorityChoices = ["Urgent","Immediate","Sooner","Not-Priority"];
  this.priority
 }
}

const getPriority = {
 getPriorityIndex(index) {
  this.priority = this.priorityChoices[index];
 }
}

Object.assign(Task.prototype, getPriority);

function InputController() {
 const LIST = new List();
 LIST.addProject('Today')
 LIST.addProject('Tomorrow')
 LIST.addProject('In the future')

const getList = () => {
 console.log(LIST.getList())
}
 const addProjectBtn = document.querySelector('.add-title');
 const titleModal = document.querySelector('.title-modal');
 const createTitleBtn = document.querySelector('.create-title');
 const projectDiv = document.querySelector('.project-div');
 const mainContentDiv = document.querySelector('.content');
 mainContentDiv.textContent = ""

 
 addProjectBtn.addEventListener('click', () => {
  titleModal.style.display = "block";
 }) 
 createTitleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  projectDiv.textContent = ""
  const title = document.querySelector('#title').value;
  LIST.addProject(title);
  projectDiv.appendChild(CreateProjectButton(LIST.list))
  taskInstance();
  getList();
  titleModal.style.display = "none";
 }) 
 projectDiv.appendChild(CreateProjectButton(LIST.list))


 const taskInstance = () => {
 const projectsArray = document.querySelectorAll('.project');
 CreateTaskButton(projectsArray);

 projectsArray.forEach(project => {
  project.addEventListener('click', () => {
   mainContentDiv.textContent = "";
   const index = project.dataset.index
   
   const taskDiv = document.createElement('div');
   const createButton = document.createElement('button');
   createButton.dataset.index = index;
   createButton.classList.add('add-task-btn');
   createButton.textContent = "+";
   taskDiv.appendChild(createButton);
   mainContentDiv.appendChild(taskDiv);
  })
 })
 }
 taskInstance();
 return {
  getList
 }
}

function CreateProjectButton(listOfProjects) {
 const projectWrapper = document.createElement('div');
 projectWrapper.textContent = "";
 projectWrapper.classList.add('project-wrapper');
 listOfProjects.forEach((project,index) => {
  const createButton = document.createElement('button');
  createButton.classList.add('project');
  createButton.dataset.index = index 
  createButton.textContent = project.title;
  projectWrapper.appendChild(createButton)
 })
 return projectWrapper
}

function CreateTaskButton(projects) {
 projects.forEach(project => {
  project.addEventListener('click',() => {
   console.log(project.dataset.index);
  })
 } )
}

const me = InputController();