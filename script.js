// Flashcard data will be loaded from an external JSON file
let flashcards = [];
let currentCardIndex = 0;
let memorizedCards = new Set();
let testMode = false;

// DOM element references
const flashcardEl = document.getElementById('flashcard');
const frontContentEl = document.getElementById('frontContent');
const backContentEl = document.getElementById('backContent');
const cardNumberEl = document.getElementById('cardNumber');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const testModeButton = document.getElementById('testModeButton');
const resetButton = document.getElementById('resetButton');
const noCardsMessage = document.getElementById('noCardsMessage');
const memorizedContainer = document.getElementById('memorizedContainer');
const memorizedCheckbox = document.getElementById('memorizedCheckbox');

// Function to load flashcards from JSON file
async function loadFlashcardsFromJSON() {
    try {
        const response = await fetch('flashcards.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            flashcards = data;
            displayCard();
        } else {
            showErrorMessage('Flashcards data is empty or not an array');
        }
    } catch (error) {
        showErrorMessage(`Failed to load flashcards: ${error.message}`);
    }
}

function adjustFontSize(element, maxLines = 8, minFontSize = 12) {
    const maxHeight = parseFloat(getComputedStyle(element).lineHeight) * maxLines;
    let fontSize = parseFloat(getComputedStyle(element).fontSize);
    
    while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
    }
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `Error: ${message}. Please check the console for more details.`;
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '20px';
    document.querySelector('.app-container').appendChild(errorMessage);
    console.error(message);
}

function displayCard() {
    if (memorizedCards.size === flashcards.length) {
        showNoCardsMessage();
        return;
    }

    while (memorizedCards.has(currentCardIndex)) {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    }

    const card = flashcards[currentCardIndex];
    frontContentEl.textContent = card.front;
    backContentEl.textContent = card.back;
    cardNumberEl.textContent = `Card ${currentCardIndex + 1} of ${flashcards.length}`;
    flashcardEl.classList.remove('flipped');
    updateMemorizedCheckbox();

    // Apply dynamic font sizing
    adjustFontSize(frontContentEl);
    adjustFontSize(backContentEl);
}

function showNoCardsMessage() {
    flashcardEl.style.display = 'none';
    noCardsMessage.classList.remove('hidden');
}

function updateMemorizedCheckbox() {
    memorizedCheckbox.checked = memorizedCards.has(currentCardIndex);
}

function toggleTestMode() {
    testMode = !testMode;
    testModeButton.textContent = testMode ? 'Study Mode' : 'Test Mode';
    memorizedContainer.classList.toggle('hidden', !testMode);
}

function resetCards() {
    memorizedCards.clear();
    currentCardIndex = 0;
    displayCard();
    flashcardEl.style.display = 'block';
    noCardsMessage.classList.add('hidden');
}

// Event Listeners
flashcardEl.addEventListener('click', () => {
    flashcardEl.classList.toggle('flipped');
});

prevButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
});

nextButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    displayCard();
});

testModeButton.addEventListener('click', toggleTestMode);
resetButton.addEventListener('click', resetCards);

memorizedCheckbox.addEventListener('change', () => {
    if (memorizedCheckbox.checked) {
        memorizedCards.add(currentCardIndex);
    } else {
        memorizedCards.delete(currentCardIndex);
    }
    displayCard();
});

// Initialize the application
document.addEventListener('DOMContentLoaded', loadFlashcardsFromJSON);
