
let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'doing' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'done' }
];

function renderTasks() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('doing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        document.getElementById(task.status).appendChild(taskCard);
    });
}

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.dataset.taskId = task.id;

    taskCard.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
    `;

    taskCard.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    });

    return taskCard;
}

function allowDrop(event) {
    event.preventDefault();
    const column = event.target.closest('.column');
    column.classList.add('dragover');
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
    const column = event.target.closest('.column');
    column.classList.remove('dragover');
    
    const newStatus = column.querySelector('h3').textContent.toLowerCase();
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (task) {
        task.status = newStatus;
        renderTasks(); 
    }
}

document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        status: 'todo'
    };

    tasks.push(newTask);
    renderTasks(); 
    document.getElementById('task-form').reset();
});

renderTasks();

