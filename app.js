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
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              maxHeight: 100,
              autoClose: true,
              closeOnClick: false,
              className: "running-popup",
            })
          )
          .setPopupContent("Hustle is the new alpha")
          .openPopup();
      });
    },
    function () {
      alert("cannot get the location");
    }
  );
