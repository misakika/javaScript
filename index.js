addEventListener("load", () => {
  let long;
  let lat;
  let apiKey = "f287520e665ac6cf449d910736ec5362";
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone= document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span")

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
      fetch(api)
        .then(r => {
          return r.json();
        })
        .then(data => {
          const temperature = data.main.temp;
          const summery = data.weather[0].description;
          const timeZone = data.name;
          const celsius = temperature*1.8+32;
          console.log(celsius)
          //set Dom Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summery;
          locationTimeZone.textContent = timeZone;
          console.log(data)
          //change temperature to Celsius/Farenheit
          temperatureSection.addEventListener("click", ()=> {
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "℃";
              temperatureDegree.textContent = temperature;
            }else{
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = celsius;
            }
          })
        })
    })
  }
});