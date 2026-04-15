let SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwx7Eh3PW3XvXtrinC6pdn6dgftezov_FQHk-v2b6nv-u0b-W62D4ZE93BiMhfKSrM0qA/exec";

// slider
let pain = document.getElementById("pain");
pain.oninput = () => {
  document.getElementById("painVal").innerText = pain.value;
};

// SAVE
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
    show();
  });
}

// DELETE
function deleteEntry(id) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      id: id
    })
  }).then(() => {
    show();
  });
}

// LOAD FROM GOOGLE SHEETS (ONLY SOURCE OF TRUTH)
function show() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let history = document.getElementById("history");
      history.innerHTML = "";

      for (let i = data.length - 1; i >= 0; i--) {
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
    });
}

window.onload = show;
