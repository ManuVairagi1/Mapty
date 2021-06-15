const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form-input--type");
const inputDistance = document.querySelector(".form-input--distance");
const inputDuration = document.querySelector(".form-input--duration");
const inputCadence = document.querySelector(".form-input--cadence");
const inputElevation = document.querySelector(".form-input--elevation");

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
    },
    function () {
      alert("cannot get the location");
    }
  );
