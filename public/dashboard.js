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

    console.log("response", response);
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
const schedule = document.getElementById("my-schedule");

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

    const pTag = document.createElement("p");
    pTag.innerHTML = `${desc}, ${dur}, ${date}`;
    schedule.appendChild(pTag);
  } catch (error) {
    console.error(error);
  }
});
