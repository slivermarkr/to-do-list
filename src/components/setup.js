import List from './classes.js' 

export default function SetupList() {
 const LIST = new List()

 const getListOfProject = () => LIST.PROJECTLIST;
 
 const printListOfProject = () =>  console.log(LIST.PROJECTLIST);

 const createProjectInstance = (title) => {
  LIST.addProject(title);
  printListOfProject()
 }

 const createTaskInstance = (index,name,description,priorityLevel,date) => {
  getListOfProject()[index].addTask(name,description,priorityLevel,date);
  LIST.saveToLocalStorage();
 }

 const loadFromLocalStorage = () => {
  const projectInStrings = localStorage.getItem('projects');

  if(projectInStrings) {
   const parsedProjects = JSON.parse(projectInStrings);
   parsedProjects.forEach(project => {
    createProjectInstance(project.title)
    project.TASKLIST.forEach(task => {
    createTaskInstance(task.name,task.description,task.priorityLevel,task.deadline);
    });
   });
  };
 };
 return {
  getListOfProject,
  createProjectInstance,
  createTaskInstance,
  loadFromLocalStorage,
 }
} 