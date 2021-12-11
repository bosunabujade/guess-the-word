const guesssedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".messages");
const playAgainButton = document.querySelector(".play-again")
const word = "magnolia";

const wordProgress = function(word) {
    const placeholder = []
    for (const letter of word) {
        console.log(letter)
        placeholder.push("●")
    }
   wordInProgress.innerText = placeholder.join("")
}
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = inputLetter.value;
    console.log(guess)
    inputLetter.value = ""
})

console.log(wordProgress(word))