document.addEventListener("DOMContentLoaded", () => {
  // your code here

  // Functional but with some options that could be made much cleaner and less error prone
  let form = document.querySelector('#create-task-form');
  let allToDos = [];

  form.addEventListener('submit', handleSubmitClick);

  function handleSubmitClick(e) {
    e.preventDefault();
    let enteredToDo = document.querySelector('#new-task-description').value;
    let selectedPriority = document.querySelector('#priority-selection');

    let toDoObj = { val: enteredToDo, priority: selectedPriority.value };
    allToDos.push(toDoObj);
    sortByPriority(allToDos);

    form.reset();

  }

  function sortByPriority(toDoArr) {
    let sortedToDos = [];
    for (let toDo of toDoArr) {
      if (toDo.priority === 'high') {
        sortedToDos.push(toDo);
      }
    }
    for (let toDo of toDoArr) {
      if (toDo.priority === 'medium') {
        sortedToDos.push(toDo);
      }
    }
    for (let toDo of toDoArr) {
      if (toDo.priority === 'low') {
        sortedToDos.push(toDo);
      }
    }

    addToDoToDom(sortedToDos);

  }



  function addToDoToDom(sortedToDos) {

    let tasksList = document.querySelector('#tasks');
    let child = tasksList.lastElementChild;
    while (child) {
      tasksList.removeChild(child);
      child = tasksList.lastElementChild;
    }

    for (let toDo of sortedToDos) {
      let toDoElem = document.createElement('li');
      toDoElem.textContent = `${toDo.val}    `;
      if (toDo.priority === 'high') {
        toDoElem.style.color = 'red';
      } else if (toDo.priority === 'medium') {
        toDoElem.style.color = 'blue';
      }
      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.addEventListener('click', xClick);
      toDoElem.append(deleteBtn);

      tasksList.append(toDoElem);
    }
  }

  function xClick(e) {
    let choice = prompt("Type E to edit or D to delete");
    if (choice === 'D') {
      deleteToDo(e)
    } else if (choice === 'E'){
      let editedValue = prompt('Enter edited tasks:');
      let toDoText = e.target.parentNode.textContent.slice(0, e.target.parentNode.textContent.length - 5);
      let foundDeletedItem = allToDos.find(element => element.val === toDoText);
      foundDeletedItem.val = editedValue;
      sortByPriority(allToDos)

    } else {
      alert('bad command');
    }
  }

  function deleteToDo(e) {
    e.target.parentNode.remove();

    let toDoText = e.target.parentNode.textContent.slice(0, e.target.parentNode.textContent.length - 5);
    let foundDeletedItem = allToDos.find(element => element.val === toDoText);


    let foundItemIndex = allToDos.indexOf(foundDeletedItem)


    allToDos.splice(foundItemIndex, 1);

  }

});
