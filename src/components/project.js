class Project {
  constructor(input) {
    this.title = input
    this.tasks = []
  }
}
const takeTask = {
  acceptTask(name , desc, prio) {
    const task = new Task(name,desc,prio);
    this.tasks.push(task);
  }
}


class Task {
  constructor(name,description,priority){
    this.name = name
    this.description = description
    this.priority = priority
  }
}

Object.assign(Project.prototype,takeTask);

function CreateProject(input) {
  const project = new Project(input);

  const getProjectTitle = () =>  project.title

  const getProjectTasks = () => project.tasks;

  return {
    project,
    getProjectTasks,
    getProjectTitle
  }
}


const btn = document.querySelector('.add-title');
const titleModal = document.querySelector('.title-modal');
const okay = document.querySelector('.okay');

btn.addEventListener('click' , (e) => {
  e.preventDefault();
  titleModal.style.display = "block";
})

function Projects(){
  const projects = []

  const projectInstance = () => {
  const title = document.querySelector('#title').value;
  const project = CreateProject(title);
  projects.push(project);
  }
  okay.addEventListener('click', (e) => {
    e.preventDefault()
    projectInstance();
    titleModal.style.display = "none";
  })
  return {
    projects
  }
}
const me = Projects()