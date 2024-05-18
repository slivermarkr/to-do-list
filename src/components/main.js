import LIST from '../classes/list.js';

export default function setupClasses() {
const myLIST = new LIST()
myLIST.addProject("Today");
myLIST.PROJECTLIST[0].addTask('Hello',"Hi","How are you?", "Bitch")

const getProjectLIST = () => myLIST.PROJECTLIST
const getLIST = () => myLIST
return {
 getLIST,
 getProjectLIST
}
}