
let taskListElement;
let inputButton;
let inputField;
let clearTasksButton;
let taskid;
let i;
let tasks;
let checkBoxState;
let taskListMemory;
let idCounter = 0;

// starts the script
init();

function init(){

    taskid = 0;
    console.log("initializing buttons");
    taskListElement = document.querySelector("#task-list");

    console.log("Initialized taskListMemory");

    taskListMemory = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Initialized currentTaskListItems");

    // declaring variables for input field, input button and clear tasks button
    inputButton = document.getElementById("add-task-button");
    inputField = document.getElementById("input-task");


    clearTasksButton = document.getElementById("clear-button");

    // pressing Enter -> creates task
    inputField.addEventListener('keydown',  (e) => {
        if (e.key === "Enter") {
            addTask(document.getElementById("input-task").value);
        }
    });

    //adding listener to add button
    inputButton.addEventListener("click", addTask);
    clearTasksButton.addEventListener('click', clearTaskList);
    console.log("Task list initialized.")
    taskListElement = document.querySelector("#task-list");

    loadFromMemory();

}

function deleteTask(event){
    console.log(event.type);
    console.log("Delete button pressed");

    id = event.target.parentNode.parentNode.id;

    event.target.parent.remove();

    taskListElement = document.querySelector("#task-list");
    deleteFromMemory(id);

}

function taskCompositing(id, taskText, taskCheckboxState) {

    console.log("Task compositing initiated");
    //making container for task item elements
    let li = document.createElement("li");
    li.setAttribute("class", "task-list");
    li.setAttribute("id", taskid);

    console.log(li.className + " created");

    //making checkbox
    let labeltoggle = document.createElement('label');
    labeltoggle.setAttribute("class", "toggle");

    let labelinput = document.createElement('input');
    labelinput.setAttribute("type", "checkbox");
    labelinput.setAttribute("class", "task-checkbox");
    labelinput.checked = taskCheckboxState;

    console.log(checkBoxState);

    let labelspan = document.createElement('span');
    labelspan.setAttribute("class", "button-checkbox");

    //adding toggle style change listener
    labelinput.addEventListener("click", toggleDone);

    //adding parent property to reach parent element and text
    labelinput.parent = labeltoggle;
    labelspan.parent = labeltoggle;

    console.log(labelinput.className + " created");

    //making task text (span)
    let taskItemElement = document.createElement("span");
    taskItemElement.setAttribute("class", "task");
    taskItemElement.innerText = taskText;

    console.log(taskItemElement.className + " created");

    //making delete button
    let deletebutton = document.createElement('button');
    deletebutton.setAttribute("class", "delete-btn");

    let deletebuttondiv = document.createElement('div');
    deletebuttondiv.setAttribute("class", "delete-x");

    //parent property is created and used to delete the element
    //parent is not included into the Element or Node by default
    deletebutton.parent = li;
    deletebuttondiv.parent = li;

    //adding listener to the delete button
    deletebutton.addEventListener("click", deleteTask);

    console.log(deletebutton.className + " created");

    //add all elements of the task list item to the task item container
    li.appendChild(taskItemElement);
    li.appendChild(deletebutton);
    deletebutton.appendChild(deletebuttondiv);

    li.appendChild(labeltoggle);
    labeltoggle.appendChild(labelinput);
    labeltoggle.appendChild(labelspan);

    //adding li to the task list
    taskListElement.appendChild(li);

    console.log("Added task " + "\"" + taskText + "\"");

    //taskCheckboxState = checkBoxState;
    // console.log(id, taskText, taskCheckboxState);

    console.log(taskCheckboxState);

    console.log("Checkbox state: " + taskCheckboxState);
    console.log(typeof taskCheckboxState);

    let PlaceholderTask = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(PlaceholderTask);

    taskCheckboxState = Boolean(taskCheckboxState);
    console.log(typeof taskCheckboxState);

    for (let taskElement of PlaceholderTask){

        //labelinput.checked = taskElement.taskCheckboxState;
        console.log(taskElement);
        taskElement.taskCheckboxState = Boolean(taskElement.taskCheckboxState);
        console.log(typeof taskElement.taskCheckboxState);
        console.log(taskElement.taskCheckboxState);

        if (taskElement.taskCheckboxState === true) {
            labelinput.click();
            //taskItemElement.classList.add("checked");
            console.log(".checked added to taskItemElement");
            console.log(taskElement.taskCheckboxState);
        }
    }
    console.log(taskItemElement);
}

function addTask(){

    if (inputField.value === '') {
        alert("You must write something!");

    } else if (inputField.value != ''){
        taskid ++;
        let id = taskid;
        let taskText;
        let taskCheckboxState = false;
        //taskCheckboxState = Boolean(taskCheckboxState);
        taskText = document.getElementById("input-task").value;

        console.log("Input: " + taskText);
        document.getElementById("input-task").value = "";

        taskCompositing(id, taskText, taskCheckboxState);

        //taskCheckboxState = checkBoxState;
        console.log(id, taskText, taskCheckboxState);

        addToMemory(id, taskText, taskCheckboxState);
    }




}

function toggleDone(event){

    let textItem = event.target.parentNode.parentNode.querySelector(".task");

    id = event.target.parentNode.parentNode.id;

    let taskElementCheckboxCheckedBefore = event.target.checked;
    let taskElementCheckboxCheckedAfter;

    if (event.target.checked) {
        textItem.classList.add("checked");
        //idTask =
        console.log("Checked added");
        taskCheckboxState = true;
        console.log(id);
        taskElementCheckboxCheckedAfter = taskElementCheckboxCheckedBefore;
        updateMemory(id, taskCheckboxState, taskElementCheckboxCheckedAfter);
        console.log(id, taskCheckboxState);
    } else {
        textItem.classList.remove("checked");
        //idTask = event.target.parentNode.parentNode.firstChild.id;
        console.log("Checked removed");
        taskCheckboxState = false;
        console.log(id);
        taskElementCheckboxCheckedAfter = taskElementCheckboxCheckedBefore;
        updateMemory(id, taskCheckboxState, taskElementCheckboxCheckedAfter);
        //console.log(id, taskCheckboxState);
    }

}

function addToMemory(id, taskText, taskCheckboxState) {
    let taskElement = {
        id: id,
        taskText: taskText,
        taskCheckboxState: taskCheckboxState
    }
    taskListMemory.push(taskElement);

    console.log("Added to memory " + taskText);
    console.log(taskElement);

    localStorage.setItem("tasks", JSON.stringify(taskListMemory));
    console.log("Local storage updated")
}

function updateMemory(id, taskCheckboxState, taskElementCheckboxCheckedAfter) {

    //let idnumber = parseInt(id, 10);

    id = parseInt(id, 10);

    for (let taskElement of taskListMemory)  {

        taskElement.taskCheckboxState = taskElementCheckboxCheckedAfter;
        console.log(taskElementCheckboxCheckedAfter);
        console.log(taskElement);
        console.log("Element id = " + id);
        //console.log("taskElement.id String (225) = " + taskElement.id);

        //console.log("taskElement.taskCheckBoxState = " + taskElement.taskCheckBoxState);
        console.log("taskCheckboxState = " + taskCheckboxState);

        console.log(typeof taskElement.id);
        console.log(typeof id);
        //console.log(typeof idnumber);

        if (taskElement.id === id) {

            console.log("taskElement.id String (225) = " + taskElement.id);
            taskElement.taskCheckBoxState = taskCheckboxState;
            console.log("taskElement.taskCheckBoxState = " + taskElement.taskCheckboxState);

        }
    }
    console.log("Memory updated!");
    //console.log(id, taskCheckboxState);
    localStorage.setItem("tasks", JSON.stringify(taskListMemory));


}

function loadFromMemory() {


    console.log("Loading tasks from memory");
    console.log(taskListMemory);

    for (let taskElement of taskListMemory) {
        console.log(taskElement);

            if (taskElement.id > taskid) {

                taskid = taskElement.id;
        }

        console.log(taskElement.taskCheckboxState);
        taskCompositing(taskElement.id, taskElement.taskText); //taskElement.taskCheckboxState

        console.log("Tasks composed");
    }
}

function deleteFromMemory(id) {

    let newMemory = [];

    for (let taskElement of taskListMemory)  {

        if (taskElement.id != id) {
            newMemory.push(taskElement);
        }
    }

    taskListMemory = newMemory;
    console.log("Removed task from memory " + id);
    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(taskListMemory));
    console.log("Local storage updated");
}

function clearTaskList() {

    localStorage.clear();
    console.log("Found children: " + taskListElement.children.length);
    console.log("Removed children: " + taskListElement.children.length);

    //to remove from "live" array, we need to iterate backwards - otherwise the iteration won't be complete
    for (let i = taskListElement.children.length - 1; i >= 0; i--) {
        if (taskListElement.children[i].classList.contains("task-list")) {
            taskListElement.children[i].remove();
        }
    }


}

