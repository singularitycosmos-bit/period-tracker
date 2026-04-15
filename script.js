let SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwx7Eh3PW3XvXtrinC6pdn6dgftezov_FQHk-v2b6nv-u0b-W62D4ZE93BiMhfKSrM0qA/exec";

let pain = document.getElementById("pain");
pain.oninput = () => document.getElementById("painVal").innerText = pain.value;

// SAVE
function saveData(){
  fetch(SCRIPT_URL,{
    method:"POST",
    body: JSON.stringify({
      action:"add",
      date: document.getElementById("date").value,
      pain: document.getElementById("pain").value,
      notes: document.getElementById("notes").value
    })
  }).then(() => {
    loadFromLocal();
  });
}

// DELETE
function deleteEntry(id){
  fetch(SCRIPT_URL,{
    method:"POST",
    body: JSON.stringify({
      action:"delete",
      id:id
    })
  }).then(() => {
    alert("Deleted from Google Sheets ✅");
    loadFromLocal();
  });
}

// LOCAL DISPLAY (simple cache)
function loadFromLocal(){
  let data = JSON.parse(localStorage.getItem("cycleData")) || [];

  let entry = {
    id: Date.now(),
    date: document.getElementById("date").value,
    pain: document.getElementById("pain").value,
    notes: document.getElementById("notes").value
  };

  data.push(entry);
  localStorage.setItem("cycleData", JSON.stringify(data));

  show(data);
}

// SHOW UI
function show(data){
  let history = document.getElementById("history");
  history.innerHTML = "";

  for(let i = data.length - 1; i >= 0; i--){
    history.innerHTML += `
      <div class="card">
        <b>${data[i].date}</b><br>
        Pain: ${data[i].pain}<br>
        ${data[i].notes || ""}<br><br>

        <button onclick="deleteEntry(${data[i].id})">
          Delete
        </button>
      </div>
    `;
  }
}

window.onload = () => {
  let data = JSON.parse(localStorage.getItem("cycleData")) || [];
  show(data);
};
