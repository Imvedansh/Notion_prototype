// Define an interface for a to-do item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// Get references to HTML elements
const todoInput: HTMLInputElement = document.getElementById('todo-input') as HTMLInputElement;
//exit
const todoList: HTMLUListElement = document.getElementById('todo-list') as HTMLUListElement;

// Initialize an array to store to-do items
let todos: TodoItem[] = [];

// Function to add a new to-do item
function addTodo() {
  // Get the text from the input field
  const newTodoText = todoInput.value.trim();

  // If the input is not empty
  if (newTodoText !== "") {
    // Create a new to-do item object
    const newTodo: TodoItem = {
      id: Date.now(), // Generate a unique ID
      text: newTodoText,
      completed: false,
    };

    // Add the new to-do item to the array
    todos.push(newTodo);

    // Clear the input field
    todoInput.value = "";

    // Render the updated to-do list
    renderTodos();
  }
}

// Function to toggle the completion status of a to-do item
function toggleTodo(id: number) {
  // Find the to-do item in the array
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  // Render the updated to-do list
  renderTodos();
}

// Function to delete a to-do item
function deleteTodo(id: number) {
  // Filter out the to-do item to be deleted from the array
  todos = todos.filter((todo) => todo.id !== id);

  // Render the updated to-do list
  renderTodos();
}

// Function to render the to-do list in the HTML
function renderTodos() {
  // Clear the existing to-do list in the HTML
  todoList.innerHTML = "";

  // Loop through the to-do items array
  todos.forEach((todo) => {
    // Create a list item element
    const li = document.createElement("li");

    // Create a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    // Create a span element for the to-do text
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) {
      span.classList.add("completed"); // Add a class for styling completed tasks
    }

    // Create a delete button element
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    // Append the checkbox, span, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Append the list item to the to-do list
    todoList.appendChild(li);
  });
}

// Add an event listener to the button to trigger adding a to-do item
const addTodoButton: HTMLButtonElement = document.getElementById('add-todo') as HTMLButtonElement;
addTodoButton.addEventListener('click', addTodo);