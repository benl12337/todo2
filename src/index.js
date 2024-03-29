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


const tasks = [];
let activeTaskIndex = null;
let taskIndex = 0;

function task(name) {
    index = null;
    return {
        name,
        index,
    };
}

// render the task list
function renderList(newBookAdded) {
    middleDiv.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.textContent = tasks[i].name;
        newDiv.classList.add('taskRow');
        newDiv.dataset.index = tasks[i].index;
        newDiv.addEventListener('click', (e)=>{

            // make the details pane visible & update the active task index
            detailsDiv.classList.remove('hidden');
            activeTaskIndex = e.target.dataset.index;
            
            // change the displayed text in the details pane
            detailsTitle.textContent = tasks[activeTaskIndex].name;
            console.log(tasks[activeTaskIndex]);

        })
        if (newBookAdded && i == tasks.length - 1) {
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
    warningText.innerHTML = `<span id="bold">${tasks[activeTaskIndex].name}</span> will be permanently deleted.`;
    deleteWarning.prepend(warningText);
    deleteWarning.showModal();
});

deleteTaskBtn.addEventListener('click', ()=>{
    console.log('joji');
    deleteWarning.close();
    // delete the task at this specific index
    tasks.splice(activeTaskIndex,1);

    // reset the indexes
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].index = i;
        console.log(tasks[i].name, tasks[i].index);
    }
    // reset the indexes of the task
    renderList(false);

    // reset active project to first task, if no tasks then close pane

});

cancelDelete.addEventListener('click', ()=>{
    deleteWarning.close();
});



function addTask(task) {
    // add task to array
    tasks.push(task);
    task.index = taskIndex++;
    renderList(false);
}

document.addEventListener('keypress', (e) => {

    if (e.key == 'Enter') {
        addTask(new task(taskInput.value));
        console.log(tasks);
        console.log("yay!");
        renderList(true);
    }
})



const taskOne = new task('Clean room');
const taskTwo = new task('Wash car');
addTask(taskOne);
addTask(taskTwo);

renderList(false);


