let SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwx7Eh3PW3XvXtrinC6pdn6dgftezov_FQHk-v2b6nv-u0b-W62D4ZE93BiMhfKSrM0qA/exec";

// slider
let pain = document.getElementById("pain");
pain.oninput = () => {
  document.getElementById("painVal").innerText = pain.value;
};

// SAVE TO GOOGLE SHEETS
function saveData() {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add",
      date: document.getElementById("date").value,
      pain: document.getElementById("pain").value,
      notes: document.getElementById("notes").value
    })
  }).then(() => {
    alert("Saved ✅");
    addLocal();
  });
}

// LOCAL DISPLAY
function addLocal() {
  let data = JSON.parse(localStorage.getItem("cycleData")) || [];

  data.push({
    date: document.getElementById("date").value,
    pain: document.getElementById("pain").value,
    notes: document.getElementById("notes").value
  });

  localStorage.setItem("cycleData", JSON.stringify(data));

  show();
}

// SHOW HISTORY
function show() {
  let data = JSON.parse(localStorage.getItem("cycleData")) || [];
  let history = document.getElementById("history");

  history.innerHTML = "";

  for (let i = data.length - 1; i >= 0; i--) {
    history.innerHTML += `
      <div class="card">
        <b>${data[i].date}</b><br>
        Pain: ${data[i].pain}<br>
        ${data[i].notes || ""}
      </div>
    `;
  }
}

window.onload = show;
