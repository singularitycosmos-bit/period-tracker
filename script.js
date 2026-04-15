let SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFG-ADwd0N0376SBydOfEmGAG6bT0Kxa3uJQcBbjRye0pNdQvxwe4uq6DfMwPr2K0E7w/exec";

let pain = document.getElementById("pain");
pain.oninput = () => {
  document.getElementById("painVal").innerText = pain.value;
};

function saveData() {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add",
      date: document.getElementById("date").value,
      pain: document.getElementById("pain").value,
      notes: document.getElementById("notes").value
    })
  }).then(() => show());
}

function deleteEntry(id) {
  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "delete",
      id: String(id)
    })
  }).then(() => {
    show();
  });
}
function show() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let history = document.getElementById("history");
      history.innerHTML = "";

      data.reverse().forEach(item => {
        history.innerHTML += `
          <div class="entry">
            <b>${item.date}</b><br>
            Pain: ${item.pain}/10<br>
            ${item.notes || ""}

            <button class="deleteBtn" onclick="deleteEntry(${item.id})">
              Delete
            </button>
          </div>
        `;
      });
    });
}

window.onload = show;
