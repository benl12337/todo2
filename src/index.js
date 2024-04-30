import task from './task.js';
import project from './project.js';
import saveProjects from './saveProjects.js';
import getProjects from './getProjects.js';
import { format, parseJSON } from "date-fns";

const projectsDiv = document.querySelector('.div1');
const projectsList = document.querySelector('.projectsList');
const middleDiv = document.querySelector('.div2 .tasks');
const detailsDiv = document.querySelector('.div3');
const detailsTitle = document.querySelector('.detailsTitle');
const detailsDescription = document.querySelector('#taskDescription');
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
const topRowSymbol = document.querySelector('.topRow p');

const projectInput = document.querySelector('#projectInput');

let projects = [];


let activeProjectIndex = 0;
let activeTaskIndex = 0;

// when input is focused, the additional inputs pop up
taskInput.addEventListener('focus', () => {
    additionalInputs.classList.add('scaleUp');
    topRowSymbol.textContent = '○';
});

taskInput.addEventListener('focusout', () => {
    if (taskInput.value === "") {
        topRowSymbol.textContent = '+';
    }

});

// render the details div
function updateDetails() {
    detailsTitle.value = projects[activeProjectIndex].tasks[activeTaskIndex].name;
    detailsDescription.value = projects[activeProjectIndex].tasks[activeTaskIndex].description;
    if (projects[activeProjectIndex].tasks[activeTaskIndex].dueDate != "No due date") {
        detailsDate.textContent = "Due " + format(new Date(projects[activeProjectIndex].tasks[activeTaskIndex].dueDate), "EEE, dd MMM");
    } else {
        detailsDate.textContent = projects[activeProjectIndex].tasks[activeTaskIndex].dueDate;
    }
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
            activeTaskIndex = e.target.dataset.index;   // change the displayed text in the details pane
            topRowSymbol.textContent = '+';
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

// render the projects on the side
function renderProjectList() {
    projectsList.innerHTML = "";

    // append all the projects on the side
    for(let i = 0; i < projects.length; i++) {
        console.log("iffhdjfhdjdf");
        const newProjectDiv = document.createElement('div');
        newProjectDiv.dataset.index = i; 
        newProjectDiv.textContent = projects[i].name;
        
        if (activeProjectIndex == i) {
            newProjectDiv.classList.add('activeProject');
        } else {
            newProjectDiv.classList.add('projectRow');
        }
        
        newProjectDiv.addEventListener('click', (e)=>{
            activeProjectIndex = e.target.dataset.index;
            detailsDiv.classList.add('hidden');
            renderProjectList();
        });

        projectsList.append(newProjectDiv);
    }

    renderList(projects[activeProjectIndex]);

}

closeBtn.addEventListener('click', () => {
    detailsDiv.classList.add('hidden');
})

deleteBtn.addEventListener('click', () => {
    warningText.innerHTML = `<span id="bold">${projects[activeProjectIndex].tasks[activeTaskIndex].name}</span> will be permanently deleted.`;
    deleteWarning.prepend(warningText);
    deleteWarning.showModal();
});


deleteTaskBtn.addEventListener('click', () => {
    deleteWarning.close();
    // delete the task at this specific index
    projects[activeProjectIndex].tasks.splice(activeTaskIndex, 1);

    // reset the indexes
    for (let i = 0; i < projects[activeProjectIndex].tasks.length; i++) {
        projects[activeProjectIndex].tasks[i].index = i;
    }

    // close pane
    detailsDiv.classList.add('hidden');

    // reset the indexes of the task
    renderList(projects[activeProjectIndex], false);
    saveProjects(projects);
});

// close the modal dialog
cancelDelete.addEventListener('click', () => {
    deleteWarning.close();
});

// add a task to the specified project
function addTask(project, task) {
    // add task to array
    project.tasks.push(task);
    renderList(projects[activeProjectIndex], false);
}

// add a task to the current active project
document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && document.activeElement === taskInput || document.activeElement === dateInput) {
        const newTask = new task(taskInput.value, dateInput.value);
        addTask(projects[activeProjectIndex], newTask);
        activeTaskIndex = projects[activeProjectIndex].tasks.length - 1;
        renderList(projects[activeProjectIndex], true);

        // if user is changing the name of a task
    } else if (e.key == 'Enter' && document.activeElement === detailsTitle) {
        // update the task name
        projects[activeProjectIndex].tasks[activeTaskIndex].name = detailsTitle.value;

        // re-render the task list and details list
        renderList(projects[activeProjectIndex], false);

        // if user is updating a task description
    } else if (e.key == 'Enter' && document.activeElement === detailsDescription) {

        projects[activeProjectIndex].tasks[activeTaskIndex].description = detailsDescription.value;
        detailsDescription.blur();
    } else if (e.key == 'Enter' && document.activeElement === projectInput && projectInput.value != "") {
        const newProject = new project(projectInput.value);
        projects.push(newProject);
        activeProjectIndex = projects.length - 1;
        projectInput.value = "";
        projectInput.placeholder = "Add Project";
        projectInput.blur();
        renderProjectList();
    }

    saveProjects(projects);
    console.log(projects);
})


// Check if there is existing storage
if (localStorage.getItem("projects") !== null) {
    projects = getProjects();
    
} else {

    // create sample project and tasks
    const mainProject = new project('Main Project');
    projects.push(mainProject);
    

    // Add sample tasks
    const taskOne = new task('Clean room', null);
    const taskTwo = new task('Wash car', null);
    addTask(projects[activeProjectIndex], taskOne);
    addTask(projects[activeProjectIndex], taskTwo);
}



activeProjectIndex = 0;

renderProjectList();







