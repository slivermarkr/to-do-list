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
    const indexes = ["Urgent","Immediate","Slightly","Not a priority"]
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

  const createTask = (index,name,desc) => {
    console.log(`Adding "${name}", "${desc}" to Project:"${getList()[index].name}" of index ${index} `);

    getList()[index].addTask(name,desc);
  }

  return {
    getList,
    createTask,
    createProject
  }
}

function ScreenController() {
  const list = InputController() ;
  const navDiv = document.querySelector('.nav-div');

  const projectInstance = () => {
    const title = document.querySelector('#title').value;
    list.createProject(title);
  }

  const taskInstance = (index) => {
    const taskName = document.querySelector('#task').value;
    const description = document.querySelector('#description').value;
    const priorityArray = document.querySelectorAll('.prio');
    priorityArray.forEach(value => {
      value.addEventListener('click', () => {
        let priority = value.dataset.value;
        list.getList()[0].tasks.getPriorityIndex(priority)
      })
    })
    const getPriorityValue = () => priority;

    list.createTask(index,taskName,description);
  }
  
  const updateProjectScreen = () => {
    list.getList().forEach((project, index) => {
      const projectDiv = document.createElement('button');
      projectDiv.classList.add('project');
      projectDiv.textContent = project.name;
      projectDiv.dataset.index = index
      navDiv.appendChild(projectDiv);
    })
  }

  const updateTaskScreen = () => {
    list.getList().forEach((project => {
      project.tasks.forEach(task => {
        console.log(task)
      })
    }))
  }

  const createProjectBtn = document.querySelector('.add-title');
  const titleModal = document.querySelector('.title-modal');
  const okayProject = document.querySelector('.okay');
  const addTaskBtn = document.querySelector('#addtask')
  const tasksModal = document.querySelector('#dialog');

  createProjectBtn.addEventListener('click', () => titleModal.style.display = "block");

  okayProject.addEventListener('click', (e) => {
    e.preventDefault()
    navDiv.textContent = ""
    projectInstance()
    updateProjectScreen();
    titleModal.style.display = "none";
  })

  list.createProject("Today");
  updateProjectScreen();

  const projectBtn = document.querySelector('nav');

  let currentIndex;
  
    projectBtn.addEventListener('click' ,(e) => {
      if(!e.target.className.contains === "project") return
      currentIndex = e.target.dataset.index;
      tasksModal.style.display = "block";
    })

  const getCurrentIndex = () => currentIndex;

  addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskInstance(getCurrentIndex());
    tasksModal.style.display = "none";
  })
  return {
    list
  }
}
const me = ScreenController()