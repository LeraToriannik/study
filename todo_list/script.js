"use strict";

const button = document.querySelector("button"),
  input = document.querySelector("input"),
  myTodoList = document.querySelector("#myTodoList");
let arr = [];

button.addEventListener("click", () => {
  if (input.value === "") return;
  createNewTodo(input);
  input.value = "";
});

function createNewTodo(item) {
  createArrTodo(item);
  printTodo();
}

function createArrTodo(i) {
  const obj = createObjTodo(i);
  arr.push(obj);
  console.log(arr);
}

function createObjTodo(elem) {
  const maxId = arr.reduce(
    (acc, curr) => (acc.id > curr.id ? acc.id : curr.id),
    0
  );
  return {
    id: maxId + 1,
    name: elem.value,
    isComplete: false,
  };
}

function printTodo(value) {
  const ul = document.createElement("ul");
  myTodoList.innerHTML = "";
  myTodoList.appendChild(ul);

  arr.forEach((item, i) => {
    const li = document.createElement("li"),
      nameTodo = document.createElement("div"),
      editBtn = document.createElement("button"),
      deleteBtn = document.createElement("button"),
      elInput = document.createElement("input"),
      saveBtn = document.createElement("button");

    ul.appendChild(li);
    li.append(nameTodo, editBtn, deleteBtn);

    nameTodo.className = "nameTodo";
    nameTodo.textContent = arr[i]["name"];

    addAttrButtonEdit(editBtn);
    addAttrButtonSave(saveBtn);
    addAttrButtonDelete(deleteBtn, arr[i]);

    function addAttrButtonEdit(element, item) {
      element.className = "editBtn";
      element.textContent = "edit";
      element.onclick = editTodoItem;
    }

    function editTodoItem() {
      li.prepend(elInput);
      deleteBtn.before(saveBtn);
      nameTodo.classList.add("hidden");
      editBtn.classList.add("hidden");
      elInput.className = "elInput";
      elInput.value = nameTodo.innerText;
    }

    function addAttrButtonSave(element, item) {
      element.className = "saveBtn";
      element.textContent = "save";
      element.onclick = saveTodoItem;
    }

    function saveTodoItem() {
      nameTodo.innerText = elInput.value;
      arr[i]["name"] = elInput.value;
      elInput.classList.add("hidden");
      nameTodo.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      editBtn.classList.remove("hidden");
      printTodo();
    }

    function addAttrButtonDelete(element, item) {
      element.className = "deleteBtn";
      element.textContent = "delete";
      element.setAttribute("data-id", arr[i]["id"]);
      element.onclick = deleteTodoItem;
    }

    function deleteTodoItem() {
      arr = arr.filter((elem) => {
        return elem.id !== +this.dataset.id;
      });
      printTodo();
    }
  });
}
