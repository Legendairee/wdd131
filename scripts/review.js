// This count the total numbers of review 
function updateReviewCounter() {
    let count = localStorage.getItem("reviewCount");

    if (count === null) {
        count = 0;
    } else {
        count = parseInt(count);
    }

    count = count + 1;

    localStorage.setItem("reviewCount", count);
    document.getElementById("reviewCount").textContent = count;
}

updateReviewCounter();

// This updates the year and date on the footer.
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;


