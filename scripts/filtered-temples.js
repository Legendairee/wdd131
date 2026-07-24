
// ========== This is date information for the footer ==============
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastmodified");

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.innerHTML = `Last Modified: ${document.lastModified}`;


// ======== This is my Hamburger menu===========
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


// ========== This is array of objects with the temples information ===========
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
        templeName: "Asunción Paraguay Temple",
        location: "Asunción, Paraguay",
        dedicated: "2002, May, 19",
        area: 11906,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/asuncion-paraguay/400x250/4-e49cfde212b104b97a0463371127c11e47f9c084.jpeg"
    },

    {
        templeName: "Cardston Alberta Temple",
        location: "Cardston, Alberta Canada",
        dedicated: "1923, August, 26-29",
        area: 88562,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cardston-alberta/400x250/cardston-canada-temple-lds-1072764-wallpaper.jpg"
    },

    {
        templeName: "Columbus Ohio Temple",
        location: "Columbus, Ohio, United States",
        dedicated: "1999, September 4-5",
        area: 11745,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/columbus-ohio/400x250/columbus-temple-lds-406110-wallpaper.jpg"
    },
    
];


// =========== This is my temple card function =========
const figureContainer = document.querySelector(".figure-container");
const mainHeading = document.querySelector("main h1");

function createTempleCard(templeList) {

    figureContainer.innerHTML = "";

    templeList.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let image = document.createElement("img");
    
        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">LOCATION:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">DEDICATED:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">AREA:</span> ${temple.area.toLocaleString()} sq ft`;
        image.setAttribute("src", temple.imageUrl);
        image.setAttribute("alt", `${temple.templeName} Temple`);
        image.setAttribute("loading", "lazy");
        

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(image);
        
        figureContainer.appendChild(card);
    });
}


// ============= This is my temple filter function ==========
function getTemples(filter = "home") {

    let sortingTemples = temples;

    if (filter === "old") {
        sortingTemples = temples.filter(temp => {
            const year = parseInt(temp.dedicated.split(",")[0]);
            return year < 1900;
        });

        mainHeading.textContent = "Old Temples";
    }

    else if (filter === "new") {
        sortingTemples = temples.filter(temp => {
            const year = parseInt(temp.dedicated.split(",")[0]);
            return year > 2000;
        });

        mainHeading.textContent = "New Temples"
    }

    else if (filter === "large") {
        sortingTemples = temples.filter(temp => temp.area > 90000);
        mainHeading.textContent = "Large Temples";
    }
        
    else if (filter === "small") {
        sortingTemples = temples.filter(temp => temp.area < 10000);
        mainHeading.textContent = "Small Temples";
    }

    else {
        mainHeading.textContent = "Home";
    }

    createTempleCard(sortingTemples);

}


// ========= This is the event listener section ===========
document.querySelectorAll(".navigation a").forEach(navLink => {
    navLink.addEventListener("click", (event) => {
        event.preventDefault();

        const filterChoice = navLink.getAttribute("data-filter");
 
        document.querySelectorAll(".navigation a").forEach(activeNav => activeNav.classList.remove("active"));
        navLink.classList.add("active");

        getTemples(filterChoice);
    });
});

getTemples("home");