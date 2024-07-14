const btnAdd = document.querySelectorAll("button")[0];
const btnClear = document.querySelectorAll("button")[1];
const list = document.querySelector("ul");
const input = document.querySelector("input");
const trashes = document.querySelectorAll("li");

let arrayLs;

if (localStorage.getItem("data")) {
  arrayLs = JSON.parse(localStorage.getItem("data"));
} else {
  arrayLs = [];
}
// console.log(arrayLs);
// console.log(typeof arrayLs);

// -------------------------------------------------------------show item from local-storage

window.addEventListener("load", (event) => {
  if (arrayLs.length) {
    arrayLs.forEach((item) => {
      const li = document.createElement("li");
      list.insertBefore(li, list.children[0]);
      li.outerHTML = `<li class="">${item}<i class="icon fas fa-trash"></i></li>`;
    });
  }
});

// -------------------------------------------------------------add item
btnAdd.addEventListener("click", () => {
  if (input.value.trim()) {
    const li = document.createElement("li");
    list.insertBefore(li, list.children[0]);
    li.outerHTML = `<li class="">${input.value}<i class="icon fas fa-trash"></i></li>`;

    // ---------------------------------------------add to local storage
    arrayLs.push(`${input.value}`);
    localStorage.setItem("data", JSON.stringify(arrayLs));
  }
  input.value = "";
});

// -------------------------------------------------------------remove one item

list.addEventListener("click", (e) => {
  if (e.target.nodeName == "I") {
    console.log(e.target.parentElement.textContent);
    let filteredItems = arrayLs.filter(
      (item) => item != e.target.parentElement.textContent
    );
    console.log(filteredItems);
    localStorage.setItem("data", JSON.stringify(filteredItems));
    e.target.parentElement.remove();
  }
});
// -------------------------------------------------------------remove all items

btnClear.addEventListener("click", () => {
  list.innerHTML = "";
  localStorage.clear();
});
