const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const search = document.getElementById("search");

let editMode = false;
let editItem = null;

/* Load */
document.addEventListener("DOMContentLoaded", loadTasks);

/* Add with Enter */
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

/* Search */
search.addEventListener("input", filterTasks);

/* Add / Edit */
function addTask() {

  const text = input.value.trim();

  if (!text) return alert("Empty task!");

  if (editMode) {
    editItem.querySelector("span").innerText = text;
    editMode = false;
    editItem = null;
  } 
  else {
    createTask(text, false);
  }

  input.value = "";
  save();
}

/* Create */
function createTask(text, completed) {

  const li = document.createElement("li");

  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div class="task-btns">
      <button onclick="done(this)">✔</button>
      <button onclick="edit(this)">✏</button>
      <button onclick="removeTask(this)">❌</button>
    </div>
  `;

  list.appendChild(li);
}

/* Done */
function done(btn) {
  btn.closest("li").classList.toggle("completed");
  save();
}

/* Edit */
function edit(btn) {
  editItem = btn.closest("li");
  input.value = editItem.querySelector("span").innerText;
  editMode = true;
}

/* Delete */
function removeTask(btn) {
  btn.closest("li").remove();
  save();
}

/* Clear All */
function clearAll() {
  if (confirm("Delete all tasks?")) {
    list.innerHTML = "";
    save();
  }
}

/* Filter */
function filterTasks() {

  const val = search.value.toLowerCase();

  document.querySelectorAll("li").forEach(li => {

    li.style.display =
      li.innerText.toLowerCase().includes(val)
        ? "flex"
        : "none";
  });
}

/* Save */
function save() {

  const tasks = [];

  document.querySelectorAll("li").forEach(li => {

    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });

  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Load */
function loadTasks() {

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(t => {
    createTask(t.text, t.completed);
  });

}

/* Theme */
function toggleTheme() {
  document.body.classList.toggle("dark");
}
