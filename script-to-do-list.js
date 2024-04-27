window.onload = function() {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(todo) {
        addTodoElement(todo.text, todo.starred);
    });
};

function addTodo() {
    var inputValue = document.getElementById("todoInput").value;
    if (inputValue.trim() !== "") {
        addTodoElement(inputValue, false);
        saveTodos();
        document.getElementById("todoInput").value = "";
    }
}

function addTodoElement(todoText, starred) {
    var todoList = document.getElementById("todoList");

    var todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = function() {
        todoItem.style.textDecoration = this.checked ? "line-through" : "none";
        saveTodos();
    };

    var label = document.createElement("label");
    label.textContent = todoText;

    var starButton = document.createElement("button");
    starButton.classList.add("star-btn");
    starButton.innerHTML = '<i class="fas fa-star"></i>';
    if (starred) {
        starButton.classList.add("starred");
    }
    starButton.onclick = function() {
        todoList.prepend(todoItem);
        this.classList.toggle("starred");
        saveTodos();
    };

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = '\ue872'; // Unicode character for the provided icon
    deleteButton.onclick = function() {
        todoList.removeChild(todoItem);
        saveTodos();
    };

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(starButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}

function saveTodos() {
    var todos = [];
    var todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach(function(item) {
        var starred = item.querySelector(".star-btn").classList.contains("starred");
        todos.push({ text: item.querySelector("label").textContent, starred: starred });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

document.getElementById("todoInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});