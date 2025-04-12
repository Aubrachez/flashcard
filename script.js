let index = 0;
let flashcards = [];

const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const flashcard = document.getElementById('flashcard');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progression = document.getElementById('progression');

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        flashcards = data;
        displayCard(index);
    });

function displayCard(i) {
    const card = flashcards[i];
    questionDiv.textContent = card.question;
    answerDiv.textContent = card.reponse_complete;
    flashcard.classList.remove('flipped');
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % flashcards.length;
    displayCard(index);
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + flashcards.length) % flashcards.length;
    displayCard(index);
});

flashcard.addEventListener('click', () => {
    flashcard.querySelector('.flashcard-inner').classList.toggle('flipped');
});
function displayCard(i) {
    const card = flashcards[i];
    questionDiv.textContent = card.question;
    answerDiv.textContent = card.reponse_complete;
    flashcard.classList.remove('flipped');
    progression.textContent = `Flashcard ${i + 1} / ${flashcards.length}`;
}