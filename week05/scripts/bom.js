// Select DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// ==================== CHAPTERS MANAGEMENT ====================

// Get chapters from localStorage or start with empty array
let chaptersArray = getChapterList() || [];

// Display all saved chapters when page loads
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Button click event
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
});

// Function to display a chapter with delete button
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Save chapters to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Get chapters from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete chapter from array and localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // remove ❌
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

// ==================== VISIT COUNT & TIMESTAMP ====================

const visitInfo = document.getElementById('visit-info'); // Make sure this ID exists

let visitCount = parseInt(localStorage.getItem('bomVisitCount')) || 0;
visitCount++;
localStorage.setItem('bomVisitCount', visitCount);

function updateVisitInfo() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    const formattedTime = now.toLocaleString('en-US', options);

    if (visitCount === 1) {
        // FIRST VISIT - Replace everything with special message
        visitInfo.innerHTML = `
            <strong>Hurry! This is your first visit. Welcome!</strong><br>
            <small>First visited: ${formattedTime}</small>
        `;
        visitInfo.style.color = "#006400";
        visitInfo.style.fontSize = "0.8rem";
    } else {
        // Normal visits
        visitInfo.innerHTML = `
            Visits: <strong>${visitCount}</strong> | 
            Last visited: ${formattedTime}
        `;
    }
}

updateVisitInfo();