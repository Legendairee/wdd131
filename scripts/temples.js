
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

    if (hamButton.classList.contains('open')) {
        hamButton.textContent = '❌';
    } else {
        hamButton.textContent = '☰';
    }
});
