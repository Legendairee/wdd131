
const countryData = {
    area: "923,769 sq km",
    population: "242,460,772",
    capital: "Abuja",
    languages: "English",
    currency: "Naira",
    timeZone: "WAT",
    callingCode: "+234",
    internetTLD: ".ng"
};

const weatherData = {
    temperature: "10 °C",
    condition: "Partly Cloudy",
    wind: "5 km/h",
    windChill: "N/A"
};

function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

function ifCalculateWindChill(temp, wind) {
    return temp <= 10 && wind > 4.8;
}

function pageData() {

    document.getElementById("data-value1").textContent = countryData.area;
    document.getElementById("data-value2").textContent = countryData.population;
    document.getElementById("data-value3").textContent = countryData.capital;
    document.getElementById("data-value4").textContent = countryData.languages;
    document.getElementById("data-value5").textContent = countryData.currency;
    document.getElementById("data-value6").textContent = countryData.timeZone;
    document.getElementById("data-value7").textContent = countryData.callingCode;
    document.getElementById("data-value8").textContent = countryData.internetTLD;

    document.getElementById("weather-value1").textContent = weatherData.temperature;
    document.getElementById("weather-value2").textContent = weatherData.condition;
    document.getElementById("weather-value3").textContent = weatherData.wind;


    const temp = 10;
    const wind = 5;

    if (ifCalculateWindChill(temp, wind)) {
        const chill = calculateWindChill(temp, wind);
        weatherData.windChill = chill.toFixed(1) + " °C";
    } else {
        weatherData.windChill = "N/A";
    }

    document.getElementById("weather-value4").textContent = weatherData.windChill;
}


document.addEventListener("DOMContentLoaded", pageData);

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
