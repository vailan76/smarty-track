let tasks = JSON.parse(localStorage.getItem("smartTasks")) || [];

function saveTasks(){
  localStorage.setItem("smartTasks", JSON.stringify(tasks));
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML="";

  const priorityOrder = { high:1, medium:2, low:3 };

  tasks.sort((a,b)=>{
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA - dateB || priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  tasks.forEach((task,index)=>{
    const li = document.createElement("li");

    const now = new Date();
    const taskDate = new Date(task.datetime);

    if(taskDate < now){
      li.classList.add("overdue");
    }

    li.innerHTML = `
      <div>
        <span class="priority ${task.priority}">
          ${task.priority.toUpperCase()}
        </span>
        ${task.text}
        <div class="time">
          📅 ${taskDate.toLocaleDateString()} 
          ⏰ ${taskDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
        </div>
      </div>
      <span class="delete" onclick="deleteTask(${index})">✖</span>
    `;

    list.appendChild(li);
  });
}

function addTask(){
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;
  const priority = document.getElementById("priority").value;

  if(!text || !date || !time){
    alert("Please fill all fields");
    return;
  }

  const datetime = date + "T" + time;

  tasks.push({ text, datetime, priority });

  document.getElementById("taskInput").value="";
  document.getElementById("dateInput").value="";
  document.getElementById("timeInput").value="";

  saveTasks();
  renderTasks();
}

function deleteTask(index){
  tasks.splice(index,1);
  saveTasks();
  renderTasks();
}

renderTasks();
