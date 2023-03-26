var $ = function (id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement
};

type TodoType = {
  value: string;
  isComplete: boolean;
  id?: number
  updatedAt?: any;
  createAt?: any;
}

let todoList: TodoType[] = []

const handleOnKeyDown = (e: KeyboardEvent) => {
  if (e?.keyCode === 13) {
    console.log((e.target as HTMLInputElement).value);
    const todo: TodoType = {
      value: (e.target as HTMLInputElement).value,
      isComplete: false
    }
    fetchRequest(`${URL}/todos`, 'post', todo).then(() => {
      renderTodolist();
      (e.target as HTMLInputElement).value = ''
    })

  }
}

const renderTodolist = () => {
  fetchRequest(`${URL}/todos`, 'get').then((data: TodoType[]) => {
    todoList = data
    let todoListHtml: string[] = []
    for (let index = 0; index < todoList.length; index++) {
      const todoHtml = `<li class="todo ${todoList[index].isComplete && 'complete'}" data-index=${index}>${todoList[index].value}</li>`
      todoListHtml = [...todoListHtml, todoHtml]
    }
    $('todolist').innerHTML = todoListHtml.join('')
    const todos = document.getElementsByClassName('todo')
    for (let index = 0; index < todos.length; index++) {
      (todos[index] as HTMLElement).onclick = handleChangeStatusTodo
    }

  })
}

const handleLoadWindow = () => {
  $('todo').onkeydown = handleOnKeyDown
  renderTodolist()
}

const handleChangeStatusTodo = (event: MouseEvent) => {
  const index = Number((event.target as HTMLElement).getAttribute('data-index'))
  fetchRequest(`${URL}/todos/${todoList[index].id}`, 'patch', {
    isComplete: !todoList[index].isComplete
  }).then(() => {
    renderTodolist()
  })
}

window.onload = handleLoadWindow