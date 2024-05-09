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

const btn = document.querySelector('.add-title');
const titleModal = document.querySelector('.title-modal');
const okay = document.querySelector('.okay');

btn.addEventListener('click' , (e) => {
  e.preventDefault();
  titleModal.style.display = "block";
})

function Projects(){
  const listOfProjects = []

  const projectInstance = () => {
  const title = document.querySelector('#title').value;
  const project = new Project(title);
  listOfProjects.push(project);
  }
  okay.addEventListener('click', (e) => {
    e.preventDefault()
    projectInstance();
    titleModal.style.display = "none";
  })
  return {
    listOfProjects
  }
}
const me = Projects()
