/* eslint-disable no-undef */

const requiredInputs = document.querySelectorAll('.req');
const newItemForm = document.querySelector('.comments-form');
const newItemText = newItemForm.querySelector('.comments-form-input');
const newItemName = newItemForm.querySelector('.comments-form-name');
const newItemDate = newItemForm.querySelector('.comments-date');

const list = document.querySelector('.comments-content');
const taskTemplate = document.querySelector('#comment-template').content;
const newItemTemplate = taskTemplate.querySelector('.comment-message');

function buttonDeleteHandler(item) {
  const closeButton = item.querySelector('.comments-delete');
  closeButton.addEventListener('click', () => {
    item.remove();
  });
}

function likeButtonHandler(item) {
  const likeElement = item.querySelector('.comments-like');
  likeElement.addEventListener('click', () => {
    likeElement.classList.toggle('comments-like--active');
  });
}

function createErrorMessage(input, text) {
  const parent = input.parentNode;
  const errorSpan = document.createElement('span');
  errorSpan.textContent = text;
  errorSpan.classList.add('error-message');
  parent.append(errorSpan);
}

function deleteErrorMessage(input) {
  const deleteElemet = input.parentNode.querySelector('span');
  if (deleteElemet) {
    deleteElemet.remove();
  }
}

requiredInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      deleteErrorMessage(input);
    }
  });
});

function validateName() {
  if (!newItemName.value.length) {
    newItemName.classList.add('error');
    createErrorMessage(newItemName, 'Поле не заполнено!');
    return false;
  }
  if (!newItemName.value.startsWith('@')) {
    newItemName.classList.add('error');
    createErrorMessage(newItemName, 'Ник должен начинаться с @');
    return false;
  }
  if (newItemName.value.length < 2) {
    newItemName.classList.add('error');
    createErrorMessage(newItemName, 'Ник не может состоять только из @');
    return false;
  }
  return true;
}

function validateText() {
  if (!newItemText.value.length) {
    newItemText.classList.add('error');
    createErrorMessage(newItemText, 'Комментарий не может быть пустым');
    return false;
  }
  return true;
}

newItemForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  requiredInputs.forEach((input) => {
    deleteErrorMessage(input);
  });
  const nameValid = validateName();
  const textValid = validateText();

  if (nameValid && textValid) {
    const task = newItemTemplate.cloneNode(true);
    const taskText = newItemText.value;
    const taskName = newItemName.value;
    const taskDate = newItemDate.value;
    const date = new Date(taskDate);
    const defaultDate = new Date();
    const defaultHours = defaultDate.getHours();
    const defaultMinutes = defaultDate.getMinutes();
  
    let fullTime = `${taskDate} ${defaultHours}:${defaultMinutes}`;
  
    if (defaultDate.getDay() === date.getDay()
    && defaultDate.getMonth() === date.getMonth()
    && defaultDate.getFullYear() === date.getFullYear()) {
      fullTime = `Сегодня ${defaultHours}: ${defaultMinutes}`;
    }
  
    if (defaultDate.getDay() - date.getDay() === 1
    && defaultDate.getMonth() === date.getMonth()
    && defaultDate.getFullYear() === date.getFullYear()) {
      fullTime = `Вчера ${defaultHours}: ${defaultMinutes}`;
    }
  
    const currentDate = `Сегодня ${defaultHours}: ${defaultMinutes}`;
    const taskNameElement = task.querySelector('.comment-message-name');
    const taskDescription = task.querySelector('p');
    const taskDateElement = task.querySelector('.comments-message-date');
  
    taskDescription.textContent = taskText;
    taskNameElement.textContent = `${taskName}:`;
  
    if (taskDate) {
      taskDateElement.textContent = fullTime;
    } else {
      taskDateElement.textContent = currentDate;
    }
  
    list.appendChild(task);
  
    newItemText.value = '';
    newItemName.value = '';
    newItemDate.value = '';
  
    buttonDeleteHandler(task);
    likeButtonHandler(task);
  }
});
