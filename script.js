document.addEventListener('DOMContentLoaded', function() {
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');

            // Load tasks from localStorage when page loads
            function loadTasks() {
                const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                savedTasks.forEach(task => {
                    createTaskElement(task);
                });
            }

            // Save tasks to localStorage
            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('#task-list li').forEach(taskItem => {
                    tasks.push(taskItem.firstChild.textContent);
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            // Create a new task element
            function createTaskElement(taskText) {
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `
                    <span>${taskText}</span>
                    <button class="remove-btn">Remove</button>
                `;
                
                taskItem.querySelector('.remove-btn').addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                });
                
                taskList.appendChild(taskItem);
            }

            // Add new task
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (!taskText) {
                    alert('Please enter a task!');
                    return;
                }
                
                createTaskElement(taskText);
                saveTasks();
                taskInput.value = '';
            }

            // Event listeners
            addButton.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });

            // Load any existing tasks
            loadTasks();
        });
    </script>
</body>
</html>