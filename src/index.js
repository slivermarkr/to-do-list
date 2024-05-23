import SetupController from './components/setup';
import './styles/main.scss';
import { format, parseISO } from 'date-fns';

function InputController() {
 const LIST = SetupController();
 const listOfProjects = LIST.getListOfProject();
 LIST.loadFromLocalStorage();

 let currentIndex = 0;
 const getCurrentIndex = () => currentIndex;

 const defaultProject = () => listOfProjects[getCurrentIndex()];

 const getProjectTitle = (title) => {
  LIST.createProjectInstance(title);
 };

 const createDefaultProject = () => {
  const projectInStrings = localStorage.getItem('projects');
  if (!projectInStrings) {
    LIST.createProjectInstance('Today');
    LIST.createProjectInstance('Home');
    LIST.createProjectInstance('Work');
  }
 };

 const printProjectsOnScreen = () => {
  projectListDiv.textContent = "";
  listOfProjects.forEach((project, index) => {
   const projectAsList = document.createElement('li');
   projectAsList.dataset.index = index;
   projectAsList.classList.add('project');
   projectAsList.textContent = project.title;
   projectAsList.onclick = () => {
    currentIndex = index;
    console.log('Project clicked, currentIndex set to:', currentIndex);
    showMainDivContent(project);
   };
   projectListDiv.appendChild(projectAsList);
  });
 };

 const showMainDivContent = (project) => {
  if (project) {
    titleDiv.textContent = project.title;
    taskDiv.textContent = "You have no task here";
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = "Add Task";
    addTaskButton.classList.add('addTaskBtn');
    taskDiv.appendChild(addTaskButton);
    addTaskButton.onclick = () => {
     showTaskModal();
    };
  } else {
    console.error('Project is undefined:', project);
  }
 };

 const showTaskModal = () => {
  taskDialog.showModal();
 };

 const updateTime = () => {
  const now = new Date();
  document.querySelector('.currentDateTime').textContent = format(now, 'PPpp');
 };

 const addProject = document.querySelector('#addProject');
 const titleDialog = document.querySelector('#titleDialog');
 const title = document.querySelector('#title');
 const addTitle = document.querySelector('#confirmTitle');
 const cancelTitle = document.querySelector('#cancelTitle');
 const projectListDiv = document.querySelector('.project-list');
 const titleDiv = document.querySelector('.titleDiv h2');
 const taskDiv = document.querySelector('.taskDiv');
 const taskDialog = document.querySelector('.taskDialog');
 const cancelTaskDialog = document.querySelector('#cancelTaskDialog');
 const btnSubmitTask = document.querySelector('.btn-submit');

 // Project side of things
 addProject.onclick = () => {
  titleDialog.showModal();
 };

 title.addEventListener('change', (e) => {
  addTitle.value = title.value;
  console.log(addTitle.value);
 });

 titleDialog.addEventListener('close', (e) => {
  if (titleDialog.returnValue !== "") {
   getProjectTitle(titleDialog.returnValue);
   printProjectsOnScreen();
   currentIndex = listOfProjects.length - 1;
   console.log('Title dialog closed, currentIndex set to:', currentIndex);
   showMainDivContent(listOfProjects[getCurrentIndex()]);
   title.value = "";
  }
 });

 addTitle.addEventListener('click', (e) => {
  e.preventDefault();
  titleDialog.close(title.value);
 });

 cancelTitle.addEventListener('click', (e) => {
  e.preventDefault();
  titleDialog.close("");
 });

 cancelTaskDialog.addEventListener('click', (e) => {
  e.preventDefault();
  taskDialog.close();
 });

 taskDialog.addEventListener('close', (e) => {
  const name = document.querySelector('#taskName').value;
  const description = document.querySelector('#description').value;
  const priorityLevels = document.querySelectorAll('input[name="priority"]');
  let priority;
  priorityLevels.forEach(priorityLevel => {
   if (priorityLevel.checked) {
    priority = priorityLevel.value;
    return;
   }
  });
  const dateInput = document.querySelector('input[name="deadline"]').value;
  let date = "" 
  if(dateInput) {
   const parseDate = parseISO(dateInput);
   date = format(parseDate, 'MMMM dd, yyyy');
  }
  if (name && description && priority && date) {
   console.log('Task Dialog closed, adding task to project index:', getCurrentIndex());
   LIST.createTaskInstance(getCurrentIndex(), name, description, priority, date);
   document.querySelector('#taskName').value = "";
   document.querySelector('#description').value = "";
   document.querySelector('input[name="deadline"]').value = "";
   priorityLevels.forEach(priorityLevel => priorityLevel.checked = false);
   printProjectsOnScreen();
   showMainDivContent(listOfProjects[getCurrentIndex()]);
  }
 });

 createDefaultProject();
 printProjectsOnScreen();
 setInterval(updateTime, 1000);
 updateTime();
 showMainDivContent(defaultProject());
}
const me = InputController();