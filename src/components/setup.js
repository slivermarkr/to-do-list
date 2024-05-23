import List from './classes.js' 

export default function SetupList() {
 const LIST = new List();

 const getListOfProject = () => LIST.PROJECTLIST;

 const printListOfProject = () => console.log(LIST.PROJECTLIST);

 const createProjectInstance = (title) => {
  LIST.addProject(title);
  printListOfProject();
  return LIST.PROJECTLIST.length - 1;
 };

 const createTaskInstance = (index, name, description, priorityLevel, date) => {
  const projects = getListOfProject();
  console.log('Projects:', projects);
  console.log('Index:', index);

  if (index >= 0 && index < projects.length) {
    projects[index].addTask(name, description, priorityLevel, date);
    LIST.saveToLocalStorage();
  } else {
    console.error('Invalid project index:', index);
  }
 };

 const loadFromLocalStorage = () => {
  const projectInStrings = localStorage.getItem('projects');

  if (projectInStrings) {
   const parsedProjects = JSON.parse(projectInStrings);
   parsedProjects.forEach(project => {
    const projectIndex = createProjectInstance(project.title);
    project.TASKLIST.forEach(task => {
     createTaskInstance(projectIndex, task.name, task.description, task.priorityLevel, task.deadline);
    });
   });
  }
 };

 return {
  getListOfProject,
  createProjectInstance,
  createTaskInstance,
  loadFromLocalStorage,
 };
}