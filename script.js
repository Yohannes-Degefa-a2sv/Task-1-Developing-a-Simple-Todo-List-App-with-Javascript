let todosJson = JSON.parse(localStorage.getItem("todos")) || [];


const filters = document.querySelectorAll(".filter");
let filter = "";

const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return "";
  }

  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="edit-btn" data-index="${index}" onclick="edit(this)"><i class="fa fa-pencil"></i></button>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = "";
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join("");
  }
}

function addTodo(todo) {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", (e) => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();

  if (todo) {
    addTodo(todo);
  }
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function edit(todo) {
  const index = todo.dataset.index;
  const newTodo = prompt("Edit your task:", todosJson[index].name);

  if (newTodo !== null && newTodo.trim() !== "") {
    todosJson[index].name = newTodo.trim();
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  }
}


