import SetupController from './components/setup'



function sayHi() {
 console.log('Hello there')
}

function InputController() {
 const LIST = SetupController();
 
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

 const addProject = document.querySelector('#addProject');
 const titleDialog = document.querySelector('#titleDialog');
 const title = document.querySelector('#title');
 const addTitle = document.querySelector('#confirmTitle');
 const projectListDiv =  document.querySelector('.projects-list ul');
 const lists = document.querySelectorAll('.projects-list ul li');
 
 projectListDiv.textContent = ""

 addProject.onclick = () => {
  titleDialog.showModal()
 }
 
 title.addEventListener('change', (e) => {
  addTitle.value = title.value;
  console.log(addTitle.value)
 })
 
 titleDialog.addEventListener('close', (e) => {
  getProjectTitle(titleDialog.returnValue);

 });
 addTitle.addEventListener('click', (e) => {
  e.preventDefault();
  titleDialog.close(title.value);
 })

 createDefaultProject()
}
const me = InputController()