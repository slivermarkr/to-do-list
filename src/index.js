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
    taskDiv.textContent = ""
    currentIndex = index;
    console.log('Project clicked, currentIndex set to:', currentIndex);
    showMainDivContent(project);
    printTasksOnScreen(project,index);
   };
   projectListDiv.appendChild(projectAsList);
  });
  printTasksOnScreen(listOfProjects[getCurrentIndex()],getCurrentIndex())
 };

 const printTasksOnScreen = (project,index) => {
  taskCardDiv.textContent = ""
  if(project.TASKLIST.length !== 0){
    project.TASKLIST.forEach(task => {
    const card = document.createElement('div');
    card.dataset.index = index
    card.classList.add("taskCard");


    card.innerHTML = `
    <p class="task-name">${task.name}</p>
    <p class="task-description">${task.description}</p>
    <p class="task-priority">${task.priorityLevel}</p>
    <p class="task-date">${task.deadline}</p>
    `
    const taskBtnGrp = document.createElement('div')
    taskBtnGrp.classList.add("task-btn-grp");
    const editTask =  document.createElement('button');
    editTask.classList.add('edit-task');
    editTask.textContent = "Edit";
    const deleteTask =  document.createElement('button');
    deleteTask.classList.add('delete-task');
    deleteTask.textContent = "Delete";
    taskBtnGrp.appendChild(editTask);
    taskBtnGrp.appendChild(deleteTask);
    card.appendChild(taskBtnGrp);
    taskCardDiv.appendChild(card);
    editTask.onclick = () => {
      console.log("Hello it edit task")
    }
    deleteTask.onclick = () => {
      console.log("Hello it delete task")
    }
  })
} else taskCardDiv.textContent = "You have no task here";

  taskDiv.appendChild(taskCardDiv);
 }
 const showMainDivContent = (project) => {
  taskDiv.textContent = ''
  if (project) {
    titleDiv.textContent = project.title;
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
 const taskCardDiv = document.querySelector('.taskCardDiv');
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
  printProjectsOnScreen(listOfProjects[getCurrentIndex()],getCurrentIndex());
 });

 createDefaultProject();
 showMainDivContent(defaultProject());
 printProjectsOnScreen();
 setInterval(updateTime, 1000);
 updateTime();

}
const me = InputController();