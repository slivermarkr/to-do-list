class Project {
  constructor(input) {
    this.name = input
    this.tasks = []
  }
}
const addTaskToProject = {
  addTask(name , desc, prio) {
    const task = new Task(name,desc,prio);
    this.tasks.push(task);
  }
}
Object.assign(Project.prototype,addTaskToProject);

class Task {
  constructor(name,description,priority){
    this.name = name
    this.description = description
    this.priority = priority
  }
}

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

  const createProject = () => {
    const title = document.querySelector('#title').value;
    myLists.addProject(new Project(title));
    console.log(myLists.list);
  }
  const getList = () => myLists.list

  const createTask = (index,name,desc,prio) => {
    getList()[index].addTask(name,desc,prio);
  }
  const okay = document.querySelector('.okay');
  okay.addEventListener('click', (e) => {
    e.preventDefault()
    createProject();

  })
  return {
    getList,
    createTask
  }
}
const me = InputController();
