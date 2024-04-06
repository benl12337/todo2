import task from './task.js';
import project from './project.js';

const middleDiv = document.querySelector('.div2 .tasks');
const detailsDiv = document.querySelector('.div3');
const detailsTitle = document.querySelector('.detailsTitle');
const detailsDate = document.querySelector('.detailsDueDate');
const taskInput = document.querySelector('.taskInput input');
const dateInput = document.querySelector('#dateInput');
const closeBtn = document.querySelector('#closeBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const deleteWarning = document.querySelector('#delete-warning');
const cancelDelete = document.querySelector('#cancel-delete');
const deleteTaskBtn = document.querySelector('#delete-task');
const warningText = document.querySelector('.delete-warning');
const additionalInputs = document.querySelector('.additionalInputs');

const projects = [];
const mainProject = new project('main');
let activeProject = mainProject;
let activeTaskIndex = 0;

// when input is focused, the additional inputs pop up
taskInput.addEventListener('focus', () => {
    additionalInputs.classList.add('scaleUp');
});

// render the details div
function updateDetails() {
    detailsTitle.textContent = activeProject.tasks[activeTaskIndex].name;


    detailsDate.textContent = activeProject.tasks[activeTaskIndex].dueDate;
}

// render the task list
function renderList(project, newTaskAdded) {
    middleDiv.innerHTML = '';

    for (let i = 0; i < project.tasks.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.textContent = project.tasks[i].name;
        newDiv.classList.add('taskRow');
        project.tasks[i].index = i;
        newDiv.dataset.index = i;
        newDiv.addEventListener('click', (e) => {
            dateInput.value = "";
            additionalInputs.classList.remove('scaleUp')
            // make the details pane visible & update the active task index
            detailsDiv.classList.remove('hidden');
            activeTaskIndex = e.target.dataset.index;            // change the displayed text in the details pane
            updateDetails();
        })
        if (newTaskAdded && i == project.tasks.length - 1) {
            newDiv.classList.add('animate');
        }

        // add the task to the middle div
        middleDiv.prepend(newDiv);
    }
    // change the displayed text in the details pane
    updateDetails();
    // empty the input bar
    taskInput.value = "";
    dateInput.value = "";
}

closeBtn.addEventListener('click', () => {
    detailsDiv.classList.add('hidden');
})

deleteBtn.addEventListener('click', () => {
    warningText.innerHTML = `<span id="bold">${activeProject.tasks[activeTaskIndex].name}</span> will be permanently deleted.`;
    deleteWarning.prepend(warningText);
    deleteWarning.showModal();
});


deleteTaskBtn.addEventListener('click', () => {
    deleteWarning.close();
    // delete the task at this specific index
    activeProject.tasks.splice(activeTaskIndex, 1);

    // reset the indexes
    for (let i = 0; i < activeProject.tasks.length; i++) {
        activeProject.tasks[i].index = i;
    }

    // close pane
    detailsDiv.classList.add('hidden');

    // reset the indexes of the task
    renderList(activeProject, false);


});

// close the modal dialog
cancelDelete.addEventListener('click', () => {
    deleteWarning.close();
});

// add a task to the specified project
function addTask(project, task) {
    // add task to array
    project.tasks.push(task);
    renderList(activeProject, false);
}

// add a task to the current active project
document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && document.activeElement === taskInput || document.activeElement === dateInput) {
        const newTask = new task(taskInput.value, dateInput.value);
        console.log(activeProject.tasks);
        addTask(activeProject, newTask);
        activeTaskIndex = activeProject.tasks.length - 1;
        renderList(activeProject, true);
    }
})

const taskOne = new task('Clean room', null);
const taskTwo = new task('Wash car', null);
addTask(activeProject, taskOne);
addTask(activeProject, taskTwo);
renderList(activeProject, false);


