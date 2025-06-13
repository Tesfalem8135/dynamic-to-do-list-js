// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is undefined (e.g., from input field), get and trim value
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Add the required class

        // Add click event to remove task from both DOM and localStorage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button to list item and item to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save task to localStorage if needed (avoid duplicate when loading)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Function to load tasks from localStorage and add to the DOM
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // Don't save again
    }

    // Function to remove a task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Event listener for Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});