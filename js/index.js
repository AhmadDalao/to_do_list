// window.localStorage.clear();

let task_input = document.querySelector(".task_input");
let add_button = document.querySelector("a.submit");
let task_holder = document.querySelector(".task-holder");
let random = 0;
let tasksArray = [];

if (window.localStorage.getItem("task")) {
  tasksArray = JSON.parse(window.localStorage.getItem("task"));
  for (let index = 0; index < tasksArray.length; index++) {
    const myObject = tasksArray[index];
    task_holder.appendChild(
      createTaskDesign(
        createTaskText(myObject.pText, myObject.id),
        createDeleteButton()
      )
    );
    deleteButtons();
  }
}

function deleteButtons() {
  let deleteButton = document.querySelectorAll("a.delete-button");
  if (deleteButton) {
    tasksArray = JSON.parse(window.localStorage.getItem("task"));
    deleteButton.forEach((element) => {
      element.addEventListener("click", (e) => {
        for (let index = 0; index < tasksArray.length; index++) {
          const myObject = tasksArray[index];
          if (myObject.id.toString() === e.target.previousElementSibling.id) {
            tasksArray.splice(index, 1);
            window.localStorage.setItem("task", JSON.stringify(tasksArray));
            e.target.parentNode.remove();
            return;
          }
        }
      });
    });
  }
}

add_button.addEventListener("click", (e) => {
  if (task_input.value === "") {
    e.preventDefault();
  } else {
    random = parseInt(Math.random().toString().slice(2, 11));
    task_holder.appendChild(
      createTaskDesign(
        createTaskText(task_input.value, random),
        createDeleteButton()
      )
    );

    window.localStorage.setItem(
      "task",
      addElementTextToArray(random, task_input.value)
    );

    deleteButtons();
  }
});

function createDeleteButton() {
  let deleteButton = document.createElement("a");
  deleteButton.classList.add("delete-button");
  let deleteText = document.createTextNode("Delete");
  deleteButton.appendChild(deleteText);
  return deleteButton;
}

function createTaskText(task_input, p_ID) {
  let myP = document.createElement("p");
  myP.setAttribute("id", p_ID);
  let pText = document.createTextNode(task_input);
  myP.appendChild(pText);
  return myP;
}

function createTaskDesign(myP, deleteButton) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.appendChild(myP);
  taskDiv.appendChild(deleteButton);
  return taskDiv;
}

function addElementTextToArray(p_ID, myPText) {
  const dataObject = {
    id: p_ID,
    pText: myPText,
  };
  tasksArray.push(dataObject);
  return JSON.stringify(tasksArray);
}
