// This populate the product select dropdown options
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function populateProducts() {
    const select = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}
populateProducts();

// This updates the year and date on the footer.
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;