// ======= Data object of country and weather =======
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
    temperature: "28 °C",
    condition: "Partly Cloudy",
    wind: "6 km/h",
    windChill: "N/A"
};

// ===== The major calculation =====
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}


function ifCalculateWindChill(temp, wind) {
    return temp <= 10 && wind > 4.8;
}

// ===== The main function of the web page ======
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


    const temp = parseFloat(weatherData.temperature);
    const wind = parseFloat(weatherData.wind);

    let windChillValue = "N/A";

    if (ifCalculateWindChill(temp, wind)) {
        const chill = calculateWindChill(temp, wind);
        windChillValue = chill.toFixed(1) + " °C";
    } else {
        weatherData.windChillValue;
    }

    document.getElementById("weather-value4").textContent = windChillValue;

    weatherData.windChill = windChillValue;
}


document.addEventListener("DOMContentLoaded", pageData);


// ====== The footer current year and date last modified =====
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
