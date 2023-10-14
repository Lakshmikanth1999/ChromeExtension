fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(quotesdata => {
        $('#quoteElement').text(quotesdata.quote);
        $('#quoteauthor').text('- '+quotesdata.author)
    })

document.addEventListener("DOMContentLoaded", function () {
      const taskList = document.getElementById("task-list");
      const addTaskButton = document.getElementById("add-task-button");
      const taskNameInput = document.getElementById("task-name");
      const taskDescriptionInput = document.getElementById("task-description");
      const taskEstimateInput = document.getElementById("task-estimate");
      const timerDisplay = document.getElementById("timer-display");
  
      let timer;
      let isRunning = false;
      let workDuration = 0;
      let breakDuration = 0;
  
      addTaskButton.addEventListener("click", function () {
        if (isRunning){
            alert("cannot add a task while the timer is running");
            return;
        }
          const taskName = taskNameInput.value;
          const taskDescription = taskDescriptionInput.value;
          const taskEstimate = taskEstimateInput.value;
  
          if (!taskName) {
              alert("Task name cannot be empty");
              return;
          }
  
          if (!taskEstimate) {
              alert("Please provide a valid task estimate (in minutes)");
              return;
          }
  
          const taskItem = createTaskElement(taskName, taskDescription, taskEstimate);
          taskList.appendChild(taskItem);
  
          
          workDuration = taskEstimate; 
          startPomodoro(workDuration);
  
        
          taskNameInput.value = "";
          taskDescriptionInput.value = "";
          taskEstimateInput.value = "";

          isRunning= true;
          addTaskButton.disabled = true;
          addTaskButton.style.backgroundColor = '#818281a1';
      });
      
  
    function createTaskElement(name, description, estimate) {
          const li = document.createElement("li");
  
          const taskDetails = document.createElement("div");
          taskDetails.innerHTML = `<strong>${name}</strong>`;
  
          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Done";
          deleteButton.addEventListener("click", function () {
              li.remove();
          });
  
          li.appendChild(taskDetails);
          li.appendChild(deleteButton);
  
          return li;
      }
  
    function startPomodoro(duration) {
          let seconds = duration * 60;
          timer = setInterval(function () {
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              timerDisplay.innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
              if (seconds === 0) {
                  addTaskButton.disabled = false;
                  addTaskButton.style.backgroundColor = '#4CAF50'

                  clearInterval(timer);
                  isRunning = false;
                  timerDisplay.innerText = "00:00";
                  alert("session completed. Take a break!");
              } else {
                  seconds--;
              }
          }, 1000);
      }
  });
  