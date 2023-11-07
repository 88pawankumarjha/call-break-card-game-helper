function addTask() {
    const taskText = document.getElementById("task").value;
    if (taskText.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        ${taskText}
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskItem);
    document.getElementById("task").value = "";
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    taskList.removeChild(button.parentNode);
}
