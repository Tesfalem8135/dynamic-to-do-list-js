document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from localStorage when page loads
    loadTasks();
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create task element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Add click event to remove button
        removeButton.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });
        
        // Add elements to DOM
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
        
        // Clear input field
        taskInput.value = '';
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            // Get just the text content (without the remove button text)
            const taskText = taskItem.childNodes[0].textContent;
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(taskText => {
                // Create task element
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;
                
                // Create remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-btn';
                
                // Add click event to remove button
                removeButton.addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                });
                
                // Add elements to DOM
                taskItem.appendChild(removeButton);
                taskList.appendChild(taskItem);
            });
        }
    }
    
    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});