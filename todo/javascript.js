var KEY_TODO = "key_todo";
var todoList = [];

function getToDoList() {
  var todoLocal = localStorage.getItem(KEY_TODO);
  if (!todoLocal) {
    return [];
  }
  return todoLocal.split("*");
}

function setToDoList(value) {
  return localStorage.setItem(KEY_TODO, value);
}

function removeToDoList() {
  return localStorage.removeItem(KEY_TODO);
}

function renderTodoList() {
  var todoListHtml = todoList.map(function (item, index) {
    return (
      "<li>" +
      item +
      "<button class='delete-todo' data-index='" +
      index +
      "'>X</button><button class='edit-todo' data-index='" +
      index +
      "'>edit</button></li>"
    );
  });
  $("ul-list").innerHTML = todoListHtml.join("");
  var deleteTodoBtn = document.getElementsByClassName("delete-todo") || [];
  for (var index = 0; index < deleteTodoBtn.length; index++) {
    deleteTodoBtn[index].onclick = handleDeleteTodo;
  }

  var editTodoBtn = document.getElementsByClassName("edit-todo") || [];
  for (var index = 0; index < editTodoBtn.length; index++) {
    editTodoBtn[index].onclick = handleEditTodo;
  }
}

function handleDeleteTodo(event) {
  var index = event.target.getAttribute("data-index");
  todoList.splice(index, 1);
  setToDoList(todoList.join("*"));
  renderTodoList();
}

function handleEditTodo(event) {
  var index = event.target.getAttribute("data-index");
  $("input").value = todoList[index];
  $("save-todo").className = "active";
  $("save-todo").setAttribute("data-index", index);
}

function handleSaveTodo(event) {
  var index = event.target.getAttribute("data-index");
  todoList[index] = $("input").value;
  $("input").value = "";
  setToDoList(todoList.join("*"));
  renderTodoList();
  $("save-todo").className = "d-none";
}

function onLoad() {
  $("add-todo").onclick = handleAddTodo;
  $("clear-todo").onclick = handleClearAllToDo;
  $("save-todo").onclick = handleSaveTodo;
  todoList = getToDoList();
  renderTodoList();
}

function handleClearAllToDo() {
  removeToDoList();
  todoList = [];
  renderTodoList();
}

function handleAddTodo() {
  var todo = $("input").value;
  todoList.push(todo);
  setToDoList(todoList.join("*"));
  renderTodoList();
  $("input").value = "";
}

window.onload = onLoad;
