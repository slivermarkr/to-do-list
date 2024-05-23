import SetupController from './components/setup'
import './styles/main.scss'
import { format, parseISO, addDays, subDays, differenceInDays, formatDistance } from 'date-fns';

function InputController() {
 const LIST = SetupController();
 
 const listOfProjects = LIST.getListOfProject()
 LIST.loadFromLocalStorage()

 let currentIndex;
 const getCurrentIndex = () => currentIndex;

 const getProjectTitle = (title) => {
  LIST.createProjectInstance(title)
 }

 const createDefaultProject = () => {
  const projectInStrings = localStorage.getItem('projects');
  if(!projectInStrings){
  LIST.createProjectInstance('Today')
  LIST.createProjectInstance('Home')
  LIST.createProjectInstance('Work')
 }
 }

 const printProjectsOnScreen = () => {
  projectListDiv.textContent = ""
  listOfProjects.forEach((project,index) => {
   const projectAsList = document.createElement('li');
   projectAsList.dataset.index = index
   projectAsList.classList.add('project');
   projectAsList.textContent = project.title;
   projectAsList.onclick = () => {
    currentIndex = index
    showMainDivContent(project.title)
    console.log(getCurrentIndex())
   }
   projectListDiv.appendChild(projectAsList);
  }) 
 }

 const showMainDivContent = (projectTitle) => {
  titleDiv.textContent = projectTitle
 }

 const updateTime = () => {
  const now = new Date();
  document.querySelector('.currentDateTime').textContent = format(now, 'PPpp');
 }

 const addProject = document.querySelector('#addProject');
 const titleDialog = document.querySelector('#titleDialog');
 const title = document.querySelector('#title');
 const addTitle = document.querySelector('#confirmTitle');
 const cancelTitle = document.querySelector('#cancelTitle');
 const projectListDiv =  document.querySelector('.project-list');
 const titleDiv = document.querySelector('.titleDiv h2');
 const lists = document.querySelectorAll('.projects-list ul li');

 //project side of things

 addProject.onclick = () => {
  titleDialog.showModal()
 }
 
 title.addEventListener('change', (e) => {
  addTitle.value = title.value;
  console.log(addTitle.value)
 })
 
 titleDialog.addEventListener('close', (e) => {
  if(titleDialog.returnValue) {
  getProjectTitle(titleDialog.returnValue);
  printProjectsOnScreen()
 }
 });

 addTitle.addEventListener('click', (e) => {
  e.preventDefault();
  titleDialog.close(title.value);
 })
 cancelTitle.addEventListener('click',(e) => {
  e.preventDefault()
  titleDialog.close()
 }) 
 
 createDefaultProject()
 printProjectsOnScreen()
 setInterval(updateTime,1000);
 updateTime()
}
const me = InputController()
