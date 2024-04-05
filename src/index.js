const middleDiv = document.querySelector('.div2 .tasks');
const detailsDiv = document.querySelector('.div3');
const detailsTitle = document.querySelector('.detailsTitle');
const taskInput = document.querySelector('.taskInput input');
const closeBtn = document.querySelector('#closeBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const deleteWarning = document.querySelector('#delete-warning');
const cancelDelete = document.querySelector('#cancel-delete');
const deleteTaskBtn = document.querySelector('#delete-task');
const warningText = document.querySelector('.delete-warning');
const additionalInputs = document.querySelector('.additionalInputs');
import task from './task.js';
import project from './project.js';


const projects = [];
const mainProject = new project('main');
let activeProject = mainProject;



let activeTaskIndex = null;
let taskIndex = 0;

taskInput.addEventListener('focus',()=>{
    additionalInputs.classList.toggle('scaleUp');
});
taskInput.addEventListener('focusout',()=>{
    additionalInputs.classList.toggle('scaleUp');
});

// render the task list
function renderList(project, newTaskAdded) {
    middleDiv.innerHTML = '';
    
    for (let i = 0; i < project.tasks.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.textContent = project.tasks[i].name;
        newDiv.classList.add('taskRow');
        newDiv.dataset.index = project.tasks[i].index;
        newDiv.addEventListener('click', (e)=>{

            // make the details pane visible & update the active task index
            detailsDiv.classList.remove('hidden');
            activeTaskIndex = e.target.dataset.index;
            
            // change the displayed text in the details pane
            detailsTitle.textContent = project.tasks[activeTaskIndex].name;

        })
        if (newTaskAdded && i == project.tasks.length - 1) {
            newDiv.classList.add('animate');
        }
        
        // add the task to the middle div
        middleDiv.prepend(newDiv);
    }

    // empty the input bar
    taskInput.value = "";
}

closeBtn.addEventListener('click', () => {
    detailsDiv.classList.add('hidden');
})

deleteBtn.addEventListener('click', ()=>{    
    warningText.innerHTML = `<span id="bold">${project.tasks[activeTaskIndex].name}</span> will be permanently deleted.`;
    deleteWarning.prepend(warningText);
    deleteWarning.showModal();
});


deleteTaskBtn.addEventListener('click', ()=>{
    deleteWarning.close();
    // delete the task at this specific index
    project.tasks.splice(activeTaskIndex,1);

    // reset the indexes
    for (let i = 0; i < activeProject.tasks.length; i++) {
        project.tasks[i].index = i;
    }
    // reset the indexes of the task
    renderList(activeProject, false);

    // reset active project to first task, if no tasks then close pane

});

// close the modal dialog
cancelDelete.addEventListener('click', ()=>{
    deleteWarning.close();
});

// add a task to the specified project
function addTask(project, task) {
    // add task to array
    project.tasks.push(task);
    task.index = taskIndex++;
    renderList(activeProject, false);
}

// add a task to the current active project
document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        addTask(activeProject, new task(taskInput.value));
        console.log("yay!");
        renderList(activeProject, true);
    }
})

const taskOne = new task('Clean room');
const taskTwo = new task('Wash car');
addTask(activeProject, taskOne);
addTask(activeProject, taskTwo);
renderList(activeProject, false);


