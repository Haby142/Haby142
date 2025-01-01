document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const clearAllButton = document.getElementById('clear-all-button');
    const taskCounter = document.getElementById('task-counter');
  
    // Charger les tâches depuis le stockage local
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
      updateCounter();
    };
  
    // Sauvegarder les tâches dans le stockage local
    const saveTasks = () => {
      const tasks = Array.from(taskList.children).map(task => ({
        text: task.querySelector('.task-text').textContent,
        completed: task.classList.contains('completed')
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const addTask = (text, completed = false) => {
      const taskItem = document.createElement('li');
      const taskText = document.createElement('span');
      taskText.textContent = text;
      taskText.classList.add('task-text');
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Supprimer';
      deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
        updateCounter();
      });
  
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteButton);
  
      if (completed) taskItem.classList.add('completed');
      taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
        updateCounter();
      });
  
      taskList.appendChild(taskItem);
      saveTasks();
      updateCounter();
    };
  
    const updateCounter = () => {
      const totalTasks = taskList.children.length;
      const completedTasks = Array.from(taskList.children).filter(task =>
        task.classList.contains('completed')
      ).length;
      taskCounter.textContent = `Total: ${totalTasks}, Terminées: ${completedTasks}`;
    };
  
    addTaskButton.addEventListener('click', () => {
      if (taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
      }
    });
  
    clearAllButton.addEventListener('click', () => {
      taskList.innerHTML = '';
      saveTasks();
      updateCounter();
    });
  
    loadTasks();
  });
  