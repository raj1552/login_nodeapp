const xValues = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const yValues = [55, 49, 44, 24, 30, 35, 18];
const barColors = [
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "orange",
  "black",
];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Exercise Tracker",
    },
  },
});
const logoutbutton = document.getElementById("logoutform");

logoutbutton.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      console.log("LogOut failed:", response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
});

const exerciseform = document.getElementById("exercise-form");
const schedule = document.getElementById("upcomingevents");

exerciseform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const dur = document.getElementById("dur").value;
  const date = document.getElementById("date").value;
  try {
    const response = await fetch("/user/exerciserecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: desc,
        duration: dur,
        date: date,
      }),
    });
    if (!response.ok) {
      return console.error(response.statusText);
    }
    alert("Sucessfully Added");
    exerciseform.reset();
  } catch (error) {
    console.error(error);
  }
});

/*function fetchdata() {
  fetch("/user/upcomingevents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      displayDataOnFrontend(data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}*/

/*function displayDataOnFrontend(data) {
  const upcomingEventsContainer = document.getElementById("upcomingevents");

  upcomingEventsContainer.innerHTML = "";

  data.forEach((event) => {
    const eventContainerDiv = document.createElement("div");
    eventContainerDiv.classList.add("event-container");

    const dayOfWeek = new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    eventContainerDiv.innerHTML = `
      <p>${dayOfWeek}</p>
      <p>${event.description}</p>
      <p>${event.duration} minutes</p>
    `;

    upcomingEventsContainer.appendChild(eventContainerDiv);
  });
}

fetchdata();*/

const calorieData = document.getElementById('data')

async function displayData(){
  try{
    const response = await fetch('/user/caloriesburn', {
      method : "GET",
      headers:{
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data)
    calorieData.innerHTML = data.rows[0].total_calories_burned
  }
  catch(error){
    console.log("Error:", error)
  }
}

displayData();

const totalWorkouts = document.getElementById('totalworkouts')

async function displaytotalWorkouts(){
  try{
    const response = await fetch('/user/totalworkouts',{
      method : "GET",
      headers:{
        "Content-Type": "application/json"
      }
    })
     const data = await response.json()
     console.log(data)
     totalWorkouts.innerHTML = data.rows[0].count
  }
  catch(error){
    console.error("Error:", error)
  }
}

displaytotalWorkouts()

const tabledata = document.getElementById('table-fill')

async function myschedule(){
  try{
    const response = await fetch('/user/upcomingevents',{
      method : 'GET',
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await response.json()
    let tableHTML = ''
    data.forEach(element => {
      const dateset = new Date(element.date).toLocaleDateString();
      tableHTML += `<tr> <td>${element.description}</td> <td>${element.duration}</td> <td>${dateset}</td> </tr>`
    });
    tabledata.innerHTML = tableHTML
  }
  catch(error){
    console.log("Error:", error)
  }
}

myschedule()








