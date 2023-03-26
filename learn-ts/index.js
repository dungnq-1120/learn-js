var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $ = function (id) {
    return document.getElementById(id);
};
var todoList = [];
var handleOnKeyDown = function (e) {
    if ((e === null || e === void 0 ? void 0 : e.keyCode) === 13) {
        console.log(e.target.value);
        var todo = {
            value: e.target.value,
            isComplete: false
        };
        fetchRequest("".concat(URL, "/todos"), 'post', todo).then(function () {
            renderTodolist();
            e.target.value = '';
        });
    }
};
var renderTodolist = function () {
    fetchRequest("".concat(URL, "/todos"), 'get').then(function (data) {
        todoList = data;
        var todoListHtml = [];
        for (var index = 0; index < todoList.length; index++) {
            var todoHtml = "<li class=\"todo ".concat(todoList[index].isComplete && 'complete', "\" data-index=").concat(index, ">").concat(todoList[index].value, "</li>");
            todoListHtml = __spreadArray(__spreadArray([], todoListHtml, true), [todoHtml], false);
        }
        $('todolist').innerHTML = todoListHtml.join('');
        var todos = document.getElementsByClassName('todo');
        for (var index = 0; index < todos.length; index++) {
            todos[index].onclick = handleChangeStatusTodo;
        }
    });
};
var handleLoadWindow = function () {
    $('todo').onkeydown = handleOnKeyDown;
    renderTodolist();
};
var handleChangeStatusTodo = function (event) {
    var index = Number(event.target.getAttribute('data-index'));
    fetchRequest("".concat(URL, "/todos/").concat(todoList[index].id), 'patch', {
        isComplete: !todoList[index].isComplete
    }).then(function () {
        renderTodolist();
    });
};
window.onload = handleLoadWindow;
