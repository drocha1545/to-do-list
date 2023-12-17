
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });
});

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const newTask = newTaskInput.value.trim();

    if (newTask) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${newTask}</span>
            <button class="delete" onclick="deleteTask(this)">Eliminar</button>
            <button class="complete" onclick="toggleComplete(this)">Completar</button>
            <button class="edit" onclick="editTask(this)">Editar</button>
        `;
        taskList.appendChild(li);
        newTaskInput.value = '';
    }
}

function deleteTask(button) {
    button.parentElement.remove();
}

function toggleComplete(button) {
    const task = button.parentElement;
    task.classList.toggle('completed');
}

function editTask(button) {
    const li = button.parentElement;
    const taskText = li.getElementsByClassName('task-text')[0];
    const currentText = taskText.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    li.insertBefore(input, taskText);
    li.removeChild(taskText);

    button.textContent = 'Guardar';
    button.onclick = function() {
        saveTask(this, input.value);
    };
}

function saveTask(button, newText) {
    const li = button.parentElement;
    const taskText = document.createElement('span');
    taskText.textContent = newText;
    taskText.className = 'task-text';
    const input = li.getElementsByClassName('edit-input')[0];
    li.insertBefore(taskText, input);
    li.removeChild(input);

    button.textContent = 'Editar';
    button.onclick = function() {
        editTask(this);
    };
}
