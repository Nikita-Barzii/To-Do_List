
let taskListMemory;
let taskListElement;
let inputButton;
let inputField;
let taskid = 0;
let i;
//localStorage.clear();

init();

function init(){

    console.log("initializing buttons");
    taskListElement = document.querySelector("#task-list");
    console.log("Initialized taskListElement");
    let currentTaskListItems = taskListElement.children;

    console.log("Initialized currentTaskListItems");

    inputButton = document.getElementById("add-task-button");
    inputField = document.getElementById("input-task");

    console.log("Loading tasks from memory")


    for (let item of currentTaskListItems) {
        item.querySelector(".delete-btn").addEventListener("click", deleteTask);
        item.querySelector(".task-checkbox").addEventListener("click", toggleDone);
        item.querySelector(".delete-btn").parent = item;
        item.querySelector(".task").parent = item;
        item.querySelector(".toggle").parent = item;

        //adding listener to add button
        inputButton.addEventListener("click", addTask);
        console.log("inputButton listened added");
        document.getElementById("clear-button").addEventListener('click', clearTaskList);

        //adding variables Task text and Checkbox state
        let taskTextItem = item.querySelector(".task").innerText;
        let taskCheckboxState = item.querySelector(".task-checkbox").checked;
        taskListMemory = JSON.parse(localStorage.getItem("tasks")) || [];


        // Adding task to memory
        addTaskToMemory(taskTextItem, taskCheckboxState);
    }
    loadFromMemory();

    console.log("Task list initialized.")
    taskListElement = document.querySelector("#task-list");

    inputField.addEventListener('keydown',  (e) => {
        if (e.key === "Enter") {
            addTask(document.getElementById("input-task").value);
        }
    });
}

function deleteTask(event){
    console.log(event.type);
    console.log("Delete button pressed");

    removeTaskFromMemory(taskText);

    event.currentTarget.parentNode.remove();
    taskListElement = document.querySelector("#task-list");
    console.log("Task deleted");

    let taskText = event.target.parent.querySelector(".task").innerText;


}

function addTask(event){

    console.log("AddTask button pressed");
    console.log(event.type);
    let li = document.createElement("li");
    let inputValue = document.getElementById("input-task").value;
    let t = document.createTextNode(inputValue);
    let spantext = document.createElement("span");
    let deletebutton = document.createElement('button');
    let deletebuttondiv = document.createElement('div');
    let labeltoggle = document.createElement('label');
    let labelinput = document.createElement('input');
    let labelspan = document.createElement('span');
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        taskid ++;

        document.getElementById("task-list").appendChild(li); //Adding <li> to <ul>
        li.className = "task-list";
        li.setAttribute("id",taskid)
        li.appendChild(spantext)
        //document.getElementById('1').appendChild(spantext);
        spantext.className = "task";
        spantext.appendChild(t);
        labeltoggle.className = "toggle";
        labeltoggle.appendChild(labelinput);
        labelinput.type = "checkbox";
        labelinput.className = 'task-checkbox';
        labelinput.addEventListener("click", toggleDone);
        labeltoggle.appendChild(labelspan);
        labelspan.className = 'button-checkbox';
        li.appendChild(deletebutton);
        deletebutton.className = "delete-btn";
        deletebutton.addEventListener("click", deleteTask);
        labelinput.addEventListener("click", toggleDone)
        deletebutton.appendChild(deletebuttondiv);
        deletebuttondiv.className = "delete-x";
        li.appendChild(labeltoggle);


    }
    console.log("Task added");
    inputField.value = "";
}

function toggleDone(event){
    //event.target.parentNode.parentNode.firstElementChild.classList.toggle('checked');
    let textItem = event.target.parentNode.parentNode.querySelector(".task");


    if (event.target.checked) {
        textItem.classList.add("checked");
        console.log("Checked class added");
        checkBoxElement.checked = checkBoxState;
    } else {
        textItem.classList.remove("checked");
        console.log("Checked class removed");
    }
    updateTask(textItem.innerText, event.target.checked);
}

function addTaskToMemory(taskText, checkBoxState) {
    let taskItemObject = {
        textItem: taskText,
        checkBoxState: checkBoxState
    }
    taskListMemory.push(taskItemObject);
    console.log("Added task to memory " + taskText);
    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(taskListMemory));
    console.log("Local storage updated")
}

function removeTaskFromMemory(taskText) {
    let newMemory = [];
    for (let item of taskListMemory) {
        if (item.textItem !== taskText) {
            newMemory.push(item);
        }
    }
    taskListMemory = newMemory;
    console.log("Removed task from memory " + taskText);
    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(taskListMemory));
    console.log("Local storage updated")
}

function loadFromMemory() {
    for (let item of taskListMemory) {
        addTask(item.textItem, item.checkBoxState, true)
    }
}

function updateTask(taskText, checkBoxState) {

    removeTaskFromMemory(taskText);
    addTaskToMemory(taskText, checkBoxState);
}

function clearTaskList() {
    console.log("Found children: " + taskListElement.children.length);

    //to remove from "live" array, we need to iterate backwards - otherwise the iteration won't be complete
    for (let i = taskListElement.children.length - 1; i >= 0; i--) {
        if (taskListElement.children[i].classList.contains("task-list-item")) {
            taskListElement.children[i].remove();
        }
    }
}

//Add to memory function
/*


//Remove from memory function

function removeTaskFromMemory(taskText) {
    let newMemory = [];
    for (let item of taskListMemory) {
        if (item.textItem !== taskText) {
            newMemory.push(item);
        }
    }
    taskListMemory = newMemory;
    console.log("Removed task from memory " + taskText);
    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(taskListMemory));
    console.log("Local storage updated")
}

function loadFromMemory() {
    for (let item of taskListMemory) {
        addTask(item.textItem, item.checkBoxState, true)
    }
}
 */