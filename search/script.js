"use strict";

const myItemList = document.getElementById("myItemList");

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

function filterBySearchText(e) {
  let elem = e.target.value;
  let filterName = filterByUserName(elem);
  printListByName(filterName);
}

filterBySearchText = debounce(filterBySearchText, 300);

document.getElementById("search").addEventListener("keyup", filterBySearchText);

const users = [
  "Макс Потапов",
  "Мирослав Филипов",
  "Влад Потапов",
  "Александр Попов",
  "Марк Самусь",
  "Максим Попов",
];

function filterByUserName(elem) {
  if (elem.length > 0) {
    myItemList.style.visibility = "visible";
    return users.filter((name) =>
      name.toLowerCase().includes(elem.toLowerCase())
    );
  } else {
    return [];
  }
}

function printListByName(arr) {
  let ul = document.createElement("ul");
  myItemList.innerHTML = "";
  myItemList.appendChild(ul);

  arr.forEach((item) => {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.setAttribute("onclick", "selectUser(this)");
    li.innerHTML += item;
  });
}

function selectUser(el) {
  document.getElementById("search").value = el.innerText;
  myItemList.style.visibility = "hidden";
}
