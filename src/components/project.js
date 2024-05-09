class Project {
  constructor(input) {
    this.name = input
    this.tasks = []
  }
}
const addTaskToProject = {
  addTask(name , desc, prio) {
    const task = new Task(name,desc);
    task.getPriorityIndex(prio);
    this.tasks.push(task);
  }
}
Object.assign(Project.prototype,addTaskToProject);

class Task {
  constructor(name,description){
    this.name = name
    this.description = description
  }
}
const getPriorityOfTask = {
  getPriorityIndex(index) {
    const indexes = ["Urgent","Immediate","Slight","Not a priority"]
    this.priority = indexes[index]
  }
}
Object.assign(Task.prototype, getPriorityOfTask);

class List {
  constructor() {
    this.list = [];
  }
}

const addProjectToList = {
  addProject(input) {
    this.list.push(input);
  }
}

Object.assign(List.prototype, addProjectToList);

function InputController() {
  const myLists = new List();

  const createProject = (title) => {
    myLists.addProject(new Project(title));
    console.log(myLists.list);
  }

  const getList = () => myLists.list

  const createTask = (index,name,desc,prio) => {
    console.log(`Adding "${name}", "${desc}", "${prio}" to Project:"${getList()[index].name}" of index ${index} `);
    getList()[index].addTask(name,desc,prio);
  }

  return {
    getList,
    createTask,
    createProject
  }
}

function ScreenController() {
  const list = InputController() ;

  const projectInstance = () => {
    const title = document.querySelector('#title').value;
    list.createProject(title);
  }

  const taskInstance = (index) => {
    const taskName = document.querySelector('#task').value;
    const description = document.querySelector('#description').value;
    const priority = document.querySelectorAll('li > button').value - 1;
    list.createTask(index,taskName,description,priority);
  }

  const createProjectBtn = document.querySelector('.add-title');
  const titleModal = document.querySelector('.title-modal');
  const okayProject = document.querySelector('.okay');

  createProjectBtn.addEventListener('click', () => titleModal.style.display = "block");

  okayProject.addEventListener('click', (e) => {
    e.preventDefault()
    projectInstance()
    titleModal.style.display = "none";
  })
}
ScreenController()