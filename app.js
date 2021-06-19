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
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat , lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
}
class Running extends workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, 14], 3.4, 23, 192);
const cycling1 = new Cycling([39, 14], 3.4, 23, 192);

//App architecture
////////////////////////////////////////////////

class App {
  //private class field
  #map;
  #mapEvent;

  constructor() {
    console.log(this.#map);
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this));

    //changing elevation gain to cadence

    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("cannot get the location");
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    form.classList.remove("hidden");
    inputDistance.focus();
    this.#mapEvent = mapE;
  }
  _toggleElevationField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");

    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    e.preventDefault();

    const validInputs = function (...inputs) {
      inputs.every((inp) => Number.isFinite(inp));
    };

    const allPositive = function (...inputs) {
      inputs.every((inp) => inp > 0);
    };

    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    //check if data is valid

    //IF activity runnning, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;

      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Please submit a positive number");
    }

    //If activity cycling , create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Please submit a positive number");
    }
    //Add new object to the workout array

    //Render workout on map as a marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("workout")
      .openPopup();
    //Render new workout on the list

    //hide the form and clear the unput fields.

    //clearing input fields;
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";
  }
}

const app = new App();
