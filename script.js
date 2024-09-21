let flashcards = [];
let currentCardIndex = 0;
let memorizedCards = new Set();
let testMode = false;

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

const flashcardsData = [
    {
        "front": "What are the main types of roads in Spain?",
        "back": "• Interurban roads (highways or 'carreteras')\n\n• Urban roads\n\n• Crossings"
    },
    {
        "front": "Where are 'carreteras' (highways) located?",
        "back": "• Outside urban areas (interurban)"
    },
    {
        "front": "What are the three main types of interurban roads in Spain?",
        "back": "• Autopistas (Motorways)\n\n• Autovías (Dual Carriageways)\n\n• Conventional Highways"
    },
    {
        "front": "What is the minimum speed capability required for vehicles on autopistas and autovías?",
        "back": "• 60 km/h"
    },
    {
        "front": "Key features of autopistas (motorways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• No level crossings\n• Limited access\n• Usually tolled"
    },
    {
        "front": "Key features of autovías (dual carriageways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• Some level crossings possible\n• Less restricted access\n• Always free"
    },
    {
        "front": "What is a conventional highway in Spain?",
        "back": "• Any other interurban road\n• No special limitations\n• Single or dual carriageways\n• May have level crossings"
    },
    {
        "front": "Which vehicles/users are NOT allowed on autopistas and autovías?",
        "back": "• Bicycles\n• Mopeds\n• Vehicles for people with reduced mobility\n• Pedestrians\n• Animals"
    },
    {
        "front": "Are motorcycles allowed on autopistas and autovías?",
        "back": "• Yes, motorcycles are allowed on autopistas and autovías"
    },
    {
        "front": "Can cyclists use the hard shoulder on autopistas and autovías?",
        "back": "• Cyclists over 14 years old may use the hard shoulder\n• Only when not prohibited by signage\n• Only on certain sections where it's explicitly allowed"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 2 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• This applies both inside and outside urban areas"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 3 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• Central lane for overtaking or turning left\n• Never in the left lane\n• Applies both inside and outside urban areas"
    },
    {
        "front": "On conventional highways outside urban areas with more than one lane in the same direction, where should cars drive?",
        "back": "• In the right lane\n• Other lanes can be used when necessary"
    },
    {
        "front": "On conventional highways outside urban areas with 3+ lanes, where should lorries, minivans, and special vehicles >3.5t drive?",
        "back": "• In the right lane\n• Adjacent lane allowed exceptionally\n• Never use remaining lanes\n• Change lanes only when traffic requires"
    }
];

function adjustFontSize(element, maxLines = 8, minFontSize = 12) {
    const maxHeight = parseFloat(getComputedStyle(element).lineHeight) * maxLines;
    let fontSize = parseFloat(getComputedStyle(element).fontSize);
    
    while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
    }
}

function loadFlashcards() {
    if (Array.isArray(flashcardsData) && flashcardsData.length > 0) {
        flashcards = flashcardsData;
        displayCard();
    } else {
        showErrorMessage('Flashcards data is empty or not an array');
    }
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `Error: ${message}. Please check the console for more details.`;
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '20px';
    document.querySelector('.app-container').appendChild(errorMessage);
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

loadFlashcards();
