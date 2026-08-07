// ============================================
// This file control the homepage of the Nigerian Recipes website.
// It show recipe cards and region cards and handles the mobile menu,
// makes the active navigation link work, and updates the footer dates.
// ============================================


// ====This is all the recipes data (a list of objects)=====
const allRecipes = [
    {
        title: "Jollof Rice",
        time: "60",
        region: "Every Region",
        img: "./images/jollof-rice.webp",
        ingredients: {
            "Base": ["Tomatoes", "Red bell peppers (tatashe)", "Scotch bonnets (rodo)", "Onions"],
            "Aromatics": ["Garlic", "Ginger", "Curry powder", "Dried thyme", "Bay leaves"],
            "Liquid & Fat": ["Cooking oil", "Rich meat stock (beef, goat, or chicken)"]
        }
    },
    {
        title: "Egusi Soup",
        time: "45",
        region: "Every Region",
        img: "./images/egusi-soup.webp",
        ingredients: {
            "Base": ["Ground egusi (melon seeds)", "Palm oil", "Spinach or bitter leaf", "Onions"],
            "Aromatics": ["Ground crayfish", "Locust beans (iru)", "Bouillon cubes"]
        }
    },
    {
        title: "Ewedu Soup",
        time: "25",
        region: "Yoruba",
        img: "./images/ewedu-soup.webp",
        ingredients: {
            "Base": ["Fresh ewedu leaves (jute leaves)", "Water"],
            "Aromatics & Seasoning": ["Locust beans (iru)", "Ground crayfish", "Bouillon cube", "Salt"],
            "Thickener & Texture": ["Edible potash (kanwa)"]
        }
    },
    {
        title: "Ofe Oha Soup",
        time: "60",
        region: "Igbo",
        img: "./images/ofe-oha.webp",
        ingredients: {
            "Base Leaves": ["Fresh Oha leaves", "Uziza leaves (optional)"],
            "Thickener": ["Cocoyam paste (taro)", "Achi", "Ofo", "Ede"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Ogiri Igbo", "Yellow pepper", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Miyan Kuka",
        time: "35",
        region: "Hausa",
        img: "./images/miyan-kuka.webp",
        ingredients: {
            "Base Leaf": ["Powdered baobab leaves (kuka)"],
            "Aromatics & Seasoning": ["Dawadawa", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"],
            "Fat": ["Red palm oil or peanut oil"]
        }
    },
    {
        title: "Afang Soup",
        time: "70",
        region: "Calabar",
        img: "./images/afang-soup.webp",
        ingredients: {
            "Base Leaves": ["Fresh Afang leaves (Ukazi)", "Waterleaf"],
            "Fat & Aromatics": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Banga Soup",
        time: "80",
        region: "Urhobo & Isoko",
        img: "./images/banga-soup.webp",
        ingredients: {
            "Base Extract": ["Palm fruit extract (Banga paste)", "Beletete leaves"],
            "Banga Spices": ["Banga spice blend (Taiko)", "Oburunbebe stick", "Orima"],
            "Aromatics & Seasoning": ["Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Black Soup",
        time: "45",
        region: "Esan, Bini",
        img: "./images/black-soup.webp",
        ingredients: {
            "Base Leaves": ["Palm fruit extract", "Fresh scent leaves", "Uziza leaves", "Washed bitter leaf"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    }
];

// ===== This is the data for popular meals by region ==========
const allRegions = [
    {
        name: "Yoruba",
        meals: ["Ewedu Soup & Amala", "Gbegiri Soup", "Ofada Rice & Ayamase"]
    },
    {
        name: "Igbo",
        meals: ["Ofe Oha", "Ofe Nsala (White Soup)", "Ofe Akwu"]
    },
    {
        name: "Hausa",
        meals: ["Miyan Kuka", "Tuwo Shinkafa", "Dambu Nama"]
    },
    {
        name: "Calabar",
        meals: ["Edikang Ikong", "Afang Soup", "Ekpang Nkukwo"]
    },
    {
        name: "Urhobo & Isoko",
        meals: ["Banga Soup & Starch", "Owo Soup", "Ukodo"]
    },
    {
        name: "Tiv",
        meals: ["Ruam Kumen (Pounded Yam)", "Pocho Soup", "Ashwe Leaf Soup"]
    },
    {
        name: "Esan Benin",
        meals: ["Edo Black Soup (Obe Efinrin)", "Benin Owo Soup", "Omisagba (Groundnut Soup)"]
    },
    {
        name: "Ijaw",
        meals: ["Kekefiyai (Plantain Porridge)", "Fresh Fish Pepper Soup", "Native Jollof Rice"]
    }
];

// ======== This control if we show all cards or just a few =======
let showAllRecipes = false;
let showAllRegions = false;

// ======== This will show the recipe cards on the page ======
function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const isLargeDesktop = window.innerWidth >= 1024;
    const displayRecipes = (isLargeDesktop || showAllRecipes) ? allRecipes : allRecipes.slice(0, 4);

    container.innerHTML = displayRecipes.map(r => {
        let ingredientsHTML = '';
        if (r.ingredients) {
            ingredientsHTML = `
                <div class="ingredients-container">
                    <h4 class="ingredients-title">Core Ingredients</h4>
                    <ul class="ingredients-list">
                        ${Object.entries(r.ingredients).map(([category, items]) => `
                            <li>
                                <span class="category-name">${category}:</span> 
                                <span class="category-items">${items.join(', ')}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" loading="lazy">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    ${ingredientsHTML}
                </div>
            </div>
        `;
    }).join('');
}

// ====== This will show the region cards on the page ========
function renderRegions() {
    const container = document.getElementById('regions-grid');
    if (!container) return;

    const isLargeDesktop = window.innerWidth >= 1024;
    const displayRegions = (isLargeDesktop || showAllRegions) ? allRegions : allRegions.slice(0, 4);

    container.innerHTML = displayRegions.map(region => `
        <div class="region-card">
            <h3 class="region-title">${region.name}</h3>
            <div class="region-meals-container">
                <span class="meals-label">Popular Dishes:</span>
                <ul class="region-meals-list">
                    ${region.meals.map(meal => `<li>${meal}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// ======= This will go to the main recipes page =======
function goToRecipes() {
    window.location.href = "recipes.html";
}


// ====== This section will show 4 recipes or show all on mobile view ===== 
function toggleRecipes() {
    showAllRecipes = !showAllRecipes;
    renderFeatured();

    const btn = document.querySelector('.featured .btn-view-all');
    if (btn) btn.textContent = showAllRecipes ? "Show Less ↑" : "View All Recipes ↓";
}

// ======= This section will show 4 region or show all on mobile view ====== 
function toggleRegions() {
    showAllRegions = !showAllRegions;
    renderRegions();

    const btn = document.querySelector('.regions .btn-view-all');
    if (btn) btn.textContent = showAllRegions ? "Show Less ↑" : "View All Region ↓";
}

// ======== This section will hide the View All buttons on big screen =======
function updateViewAllButtons() {
    const isLargeDesktop = window.innerWidth >= 1024;
    const recipeBtn = document.querySelector('.featured .btn-view-all');
    const regionBtn = document.querySelector('.regions .btn-view-all');

    if (recipeBtn) recipeBtn.style.display = isLargeDesktop ? "none" : "block";
    if (regionBtn) regionBtn.style.display = isLargeDesktop ? "none" : "block";
}

// ======= Make the current page link active in the menu =====
function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.navigation a');
    if (!navLinks.length) return;

    let activeFound = false;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && window.location.pathname.endsWith(linkPath) && linkPath !== "#") {
            link.classList.add('active');
            activeFound = true;
        } else {
            link.classList.remove('active');
        }
    });

    if (!activeFound && navLinks[0]) {
        navLinks[0].classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ======== Open and close the mobile menu =======
function setupMobileMenu() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    if (hamButton && navigation) {
        hamButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
            hamButton.textContent = hamButton.classList.contains('open') ? '✕' : '☰';
        });
    }
}

// ========= This section put the current year and last modified date in the footer ====
function updateFooterDates() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#lastModified");
    const today = new Date();

    if (currentYear) currentYear.textContent = today.getFullYear();
    if (lastModified) lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
}


// ======== This section will start everything when the page finish loading =======
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderRegions();
    updateViewAllButtons();
    setupMobileMenu();
    setupActiveNavigation();
    updateFooterDates();

    const recipeBtn = document.querySelector('.featured .btn-view-all');
    const regionBtn = document.querySelector('.regions .btn-view-all');

    if (recipeBtn) recipeBtn.addEventListener('click', toggleRecipes);
    if (regionBtn) regionBtn.addEventListener('click', toggleRegions);

    window.addEventListener('resize', () => {
        renderFeatured();
        renderRegions();
        updateViewAllButtons();
    });
});