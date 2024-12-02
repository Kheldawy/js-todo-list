document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const authorInput = document.querySelector('#author-input');
    const todoList = document.querySelector('#todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    const saveToLocalStorage = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    const renderTodos = () => {
      todoList.innerHTML = ''; // Clear current list
      
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
        <span>${todo.text} (by ${todo.author} - ${todo.timestamp})</span>
        <div>
            <button class="toggle material-symbols-outlined">${todo.completed ? 'undo' : 'done'}</button>
            <button class="edit material-symbols-outlined">Edit</button>
            <button class="delete material-symbols-outlined">Delete</button>
            <button class="up material-symbols-outlined">arrow_upward</button>
            <button class="down material-symbols-outlined">arrow_downward</button>
        </div>
    `;
  
        // Event listeners for buttons
        li.querySelector('.toggle').addEventListener('click', () => {
          todo.completed = !todo.completed;
          saveToLocalStorage();
          renderTodos();
        });
  
        li.querySelector('.delete').addEventListener('click', () => {
          todos.splice(index, 1);
          saveToLocalStorage();
          renderTodos();
        });
  
        li.querySelector('.edit').addEventListener('click', () => {
          const newText = prompt('Edit your todo:', todo.text);
          if (newText) {
            todo.text = newText;
            saveToLocalStorage();
            renderTodos();
          }
        });
  
        li.querySelector('.up').addEventListener('click', () => {
          if (index > 0) {
            [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
            saveToLocalStorage();
            renderTodos();
          }
        });
  
        li.querySelector('.down').addEventListener('click', () => {
          if (index < todos.length - 1) {
            [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
            saveToLocalStorage();
            renderTodos();
          }
        });
        todoList.appendChild(li);
      });
    };
  
    // Add new todo
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();
      const author = authorInput.value.trim();
      if (text && author) {
        const timestamp = new Date().toLocaleString();
        todos.push({ text, author,  completed: false, timestamp });
        saveToLocalStorage();
        renderTodos();
        todoForm.reset();
       
        }
    });

    renderTodos(); // Initial render
  });
  