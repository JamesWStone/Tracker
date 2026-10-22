function checkForm() {
   let activity = document.getElementById("activity").value;
   let timeSpent = document.getElementById("timeSpent").value;
   let description = document.getElementById("description").value;

   if (activity && timeSpent && description) {
       addActivity();
   } else {
       alert("Please fill in all fields and make sure inputs are valid before adding an activity.");
   }
}

function addActivity() {   

   document.getElementById("tableHeader").insertAdjacentHTML('afterend', `
      <tr>
            <td>${document.getElementById("activity").value}</td>
            <td>${document.getElementById("timeSpent").value}</td>
            <td>${document.getElementById("description").value}</td>
      </tr>
   `);
}
