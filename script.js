// On initialise l'index de la carte actuelle à 0 (première carte)
let index = 0;

// Tableau qui contiendra toutes les questions/réponses du fichier JSON
let flashcards = [];

// On récupère les références aux éléments HTML nécessaires
const questionDiv = document.getElementById('question');         // Élément qui affichera la question
const answerDiv = document.getElementById('answer');             // Élément qui affichera la réponse
const flashcard = document.getElementById('flashcard');          // Conteneur de la flashcard (pour l'effet flip)
const prevBtn = document.getElementById('prev');                 // Bouton pour aller à la carte précédente
const nextBtn = document.getElementById('next');                 // Bouton pour aller à la carte suivante
const progression = document.getElementById('progression');      // Élément pour afficher la progression (ex: 1/10)

// On charge les données depuis un fichier JSON externe (questions.json)
fetch('questions.json')
    .then(response => response.json())  // On convertit la réponse en JSON
    .then(data => {
        flashcards = data;              // On stocke les cartes dans notre tableau
        displayCard(index);             // On affiche la première carte
    });

// Fonction pour afficher une carte donnée (par son index)
// Fonction pour afficher une carte donnée (par son index)
function displayCard(i) {
    const card = flashcards[i];                     // On récupère la carte à l'index donné
    questionDiv.textContent = card.question;        // On affiche la question
    answerDiv.textContent = card.reponse_complete;  // On met la réponse, mais elle est masquée tant que la carte n’est pas retournée
    
    // On retire la classe "flipped" de l'élément flashcard-inner, cela garantit que la carte s'affiche côté question
    flashcard.querySelector('.flashcard-inner').classList.remove('flipped');  
    
    // Mise à jour de la progression
    progression.textContent = `Flashcard ${i + 1} / ${flashcards.length}`;  
}


// Événement : clic sur bouton "suivant"
nextBtn.addEventListener('click', () => {
    index = (index + 1) % flashcards.length;  // On passe à l'index suivant, boucle au début si on dépasse la fin
    displayCard(index);                       // On affiche la nouvelle carte
});

// Événement : clic sur bouton "précédent"
prevBtn.addEventListener('click', () => {
    index = (index - 1 + flashcards.length) % flashcards.length;  // On recule dans la liste, boucle à la fin si on est au début
    displayCard(index);                                           // On affiche la nouvelle carte
});

// Événement : clic sur la carte elle-même → effet flip
flashcard.addEventListener('click', () => {
    // On bascule la classe "flipped" sur l'élément .flashcard-inner
    // Cela déclenche l'animation de retournement via CSS
    flashcard.querySelector('.flashcard-inner').classList.toggle('flipped');
});
