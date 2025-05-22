// 

const apiUrl = "http://localhost:3000/";

// 1️⃣ Fetch and Display Allergy Profiles
function fetchAllergies() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("allergy-list");
      list.innerHTML = "";

      data.forEach(profile => {
        const row = createAllergyRow(profile);
        list.appendChild(row);
      });
    })
    .catch(error => console.error("Fetch error:", error));
}

// 2️⃣ Create a Table Row for a Profile
function createAllergyRow(profile) {
  const row = document.createElement("tr");

  // Name
  const nameTd = document.createElement("td");
  nameTd.textContent = profile.name;

  // Allergies
  const allergyTd = document.createElement("td");
  allergyTd.textContent = profile.allergies;

  // Medications
  const medsTd = document.createElement("td");
  medsTd.textContent = profile.medications;

  // Actions (Edit/Delete)
  const actionsTd = document.createElement("td");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-warning btn-sm me-1";
  editBtn.onclick = () => populateForm(profile);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.onclick = () => deleteAllergy(profile.id);

  actionsTd.appendChild(editBtn);
  actionsTd.appendChild(deleteBtn);

  // Append all tds to row
  row.appendChild(nameTd);
  row.appendChild(allergyTd);
  row.appendChild(medsTd);
  row.appendChild(actionsTd);

  return row;
}

// 3️⃣ Handle Form Submission (POST or PUT)
document.getElementById("allergy-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("allergy-id").value;
  const name = document.getElementById("name").value;
  const allergies = document.getElementById("allergies").value;
  const medications = document.getElementById("medications").value;

  const profileData = { name, allergies, medications };

  if (id) {
    // UPDATE
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    })
      .then(() => {
        fetchAllergies();
        resetForm();
      });
  } else {
    // CREATE
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    })
      .then(() => {
        fetchAllergies();
        resetForm();
      });
  }
});

// 4️⃣ Delete a Profile
function deleteAllergy(id) {
  if (confirm("Are you sure you want to delete this profile?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    }).then(() => fetchAllergies());
  }
}

// 5️⃣ Populate Form for Editing
function populateForm(profile) {
  document.getElementById("allergy-id").value = profile.id;
  document.getElementById("name").value = profile.name;
  document.getElementById("allergies").value = profile.allergies;
  document.getElementById("medications").value = profile.medications;

  // Open modal if using one
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("addModal"));
  modal.show();
}

// 6️⃣ Reset Form
function resetForm() {
  document.getElementById("allergy-id").value = "";
  document.getElementById("allergy-form").reset();

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("addModal"));
  modal.hide();
}

// 🔁 Fetch on Page Load
document.addEventListener("DOMContentLoaded", fetchAllergies);
