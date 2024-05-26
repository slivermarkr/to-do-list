import SetupController from './components/setup';
import './styles/main.scss';
import { format, parseISO, parse } from 'date-fns';


function InputController() {
 const LIST = SetupController();
 const listOfProjects = LIST.getListOfProject();
 LIST.loadFromLocalStorage();

 let currentIndex = 0;
 let currentTaskIndex = 0;
 const getCurrentTaskIndex = () => currentTaskIndex;
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
   const projectAsList = document.createElement('button');
   projectAsList.dataset.index = index;
   projectAsList.classList.add('project');
   projectAsList.textContent = project.title;
   projectAsList.onclick = () => {
    taskDiv.textContent = ""
    currentIndex = index;
    console.log('Project clicked, currentIndex set to:', currentIndex);
    showMainDivContent(project);
    printTasksOnScreen(project);
   };
   projectListDiv.appendChild(projectAsList);
  });
  printTasksOnScreen(listOfProjects[getCurrentIndex()])
 };

 const printTasksOnScreen = (project) => {
  taskCardDiv.textContent = ""
  if(project.TASKLIST.length !== 0){
    project.TASKLIST.forEach((task,taskIndex) => {
    const card = document.createElement('div');
    card.dataset.index = taskIndex
    card.dataset.project = project.title
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
    editTask.dataset.index = taskIndex;
    const deleteTask =  document.createElement('button');
    deleteTask.classList.add('delete-task');
    deleteTask.dataset.index = taskIndex;
    taskBtnGrp.appendChild(editTask);
    taskBtnGrp.appendChild(deleteTask);
    card.appendChild(taskBtnGrp);
    taskCardDiv.appendChild(card);
    taskCardDiv.style.display = 'grid'
    editTask.onclick = () => {
      editDialog.showModal();
      currentTaskIndex = editTask.dataset.index
      populateEditTaskModal(listOfProjects,getCurrentIndex(),getCurrentTaskIndex());
      console.log("The current Task Index from edit:", currentTaskIndex)
    }
    deleteTask.onclick = () => {
      console.log("Hello it delete task")
      currentTaskIndex = deleteTask.dataset.index
      console.log("The current Task Index from delete:", currentTaskIndex)
      deleteDialog.showModal(); 
    }
  })
} else {
  taskCardDiv.textContent = "You have no task here";
  taskCardDiv.style.display = 'block'
}

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
 const populateEditTaskModal = (projects,projectIndex,taskIndex) => {
  const task = projects[projectIndex].TASKLIST[taskIndex];
  if(!task) {
    console.error(`No task found at index ${taskIndex} for project ${projectIndex}`);
    return;
  }
  document.querySelector('.editHeader').textContent = `Project: ${projects[projectIndex].title} `
  document.querySelector('#editTaskName').value = task.name
  document.querySelector('#editDescription').value = task.description
  document.querySelectorAll('input[name="edit-priority"]').forEach(priority => {
    if(priority.value === task.priorityLevel){
      priority.checked = true
      return;
    }
  })
  const date = formatDateToInput(task.deadline);
  document.querySelector('#edit-deadline').value = date;
 }
 const updateTime = () => {
  const now = new Date();
  document.querySelector('.currentDateTime').textContent = format(now, 'PPpp');
 };
 function formatDateToInput(dateString) {
  const parsedDate = parse(dateString, 'MMMM dd, yyyy', new Date())
  return format(parsedDate, 'yyyy-MM-dd');
 }

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
 const editDialog = document.querySelector('.editDialog');
 const editCancelTaskDialog = document.querySelector('.edit-btn-cancel');
 const editSubmitTaskDialog = document.querySelector('.edit-btn-submit');
 const deleteDialog = document.querySelector('#deleteDialog');
 const deleteTaskNo = document.querySelector('.prj-delete-no');
 const deleteTaskYes = document.querySelector('.prj-delete-yes');

 // Project side of things
 editSubmitTaskDialog.onclick  = () => {
  listOfProjects[getCurrentIndex()].TASKLIST[getCurrentTaskIndex()].name = document.querySelector('#editTaskName').value
  listOfProjects[getCurrentIndex()].TASKLIST[getCurrentTaskIndex()].description = document.querySelector('#editDescription').value

  const priorityLevels = document.querySelectorAll('input[name="edit-priority"]');
  priorityLevels.forEach(priorityLevel => {
    if (priorityLevel.checked) {
      listOfProjects[getCurrentIndex()].TASKLIST[getCurrentTaskIndex()].priorityLevel = priorityLevel.value;
     return;
    }
   });
   const dateInput = document.querySelector('input[name="edit-deadline"]').value;
   
   if(dateInput) {
    const parseDate = parseISO(dateInput);
    listOfProjects[getCurrentIndex()].TASKLIST[getCurrentTaskIndex()].deadline = format(parseDate, 'MMMM dd, yyyy');
   }
   LIST.saveToLocalStorage();

   showMainDivContent(listOfProjects[getCurrentIndex()]);
   printProjectsOnScreen(listOfProjects[getCurrentIndex()],getCurrentIndex());
   
 }
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
 editCancelTaskDialog.addEventListener('click', (e) => {
  e.preventDefault();
  editDialog.close();
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
 deleteDialog.addEventListener('close' , (e) => {
  e.preventDefault();
 })
 deleteTaskNo.addEventListener('click' , (e) => {
  e.preventDefault();
  console.log('"No" button is clicked detetTaskModal closing');
  console.log('Currrent project index:', getCurrentIndex())
  console.log('Currrent task index:', getCurrentTaskIndex())
  deleteDialog.close();
 })
 deleteTaskYes.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(`Deleting Task: '${listOfProjects[getCurrentIndex()].TASKLIST[getCurrentTaskIndex()].name}' in Project: '${listOfProjects[getCurrentIndex()].title};' `);
  const project = listOfProjects[getCurrentIndex()].TASKLIST;
  if(project){
    console.log(project);
    project.splice(getCurrentTaskIndex(),1);
    LIST.saveToLocalStorage()
    printProjectsOnScreen()
    printTasksOnScreen(listOfProjects[getCurrentIndex()])
  }
  deleteDialog.close();
 })
 createDefaultProject();
 showMainDivContent(defaultProject());
 printProjectsOnScreen();
 setInterval(updateTime, 1000);
 updateTime();

}
const me = InputController();