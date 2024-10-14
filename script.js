let flashcards = [];
let currentCardIndex = 0;
let memorizedCards = new Set();
let testMode = false;
let currentCategory = 'all';

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

const categoryButtons = document.querySelectorAll('.category-button');

async function loadFlashcards() {
    try {
        const categories = ['road_use', 'manoeuvring', 'road_signs', 'vehicle', 'documentation', 'accidents'];
        const allFlashcards = [];

        for (const category of categories) {
            const response = await fetch(`card_data/${category}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            allFlashcards.push(...data.map(card => ({ ...card, category })));
        }

        flashcards = allFlashcards;
        displayCard();
    } catch (error) {
        console.error('Error loading flashcards:', error);
        showErrorMessage('Failed to load flashcards. Please check the console for more details.');
    }
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `Error: ${message}. Please check the console for more details.`;
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '20px';
    document.querySelector('.app-container').appendChild(errorMessage);
}

function renderContent(contentObj) {
    if (contentObj.type === 'image') {
        return `<img src="${contentObj.content}" alt="Flashcard Image" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    } else {
        return contentObj.content;
    }
}

function displayCard() {
    if (flashcards.length === 0) {
        showNoCardsMessage();
        return;
    }

    const filteredCards = currentCategory === 'all' 
        ? flashcards 
        : flashcards.filter(card => card.category === currentCategory);

    if (filteredCards.length === 0) {
        showNoCardsMessage();
        return;
    }

    while (memorizedCards.has(currentCardIndex)) {
        currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
    }

    const card = filteredCards[currentCardIndex];
    frontContentEl.innerHTML = renderContent(card.front);
    backContentEl.innerHTML = renderContent(card.back);
    cardNumberEl.textContent = `Card ${currentCardIndex + 1} of ${filteredCards.length}`;
    flashcardEl.classList.remove('flipped');
    updateMemorizedCheckbox();
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

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.id.replace('CategoryButton', '').toLowerCase();
        if (currentCategory === 'roaduse') currentCategory = 'road_use';
        if (currentCategory === 'roadsigns') currentCategory = 'road_signs';
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCardIndex = 0;
        displayCard();
    });
});

loadFlashcards();