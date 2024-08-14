let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;

  const taskItem = document.querySelectorAll(".task")[index];
  if (tasks[index].completed) {
    taskItem.style.color = "var(--teal)";
    taskItem.style.textDecoration = "line-through";
  } else {
    taskItem.style.color = "white";
    taskItem.style.textDecoration = "none";
  }
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
};

const updateTasksList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" />
                <img src="./img/bin.png"  onClick="deleteTask(${index})"/>
            </div>
        </div>
    `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
