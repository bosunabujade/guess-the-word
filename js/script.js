const guesssedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again")

let word = "magnolia";
const guessedLetters = []
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await response.text();
    //console.log(words)
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);word = wordArray[randomIndex].trim();
    placeholder(word)

}
getWord()

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter)
        placeholderLetters.push("●")
    }
   wordInProgress.innerText = placeholderLetters.join("")
}

placeholder(word)

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess)

    if (goodGuess) {
        makeGuess(guess)
    }
    letterInput.value = ""
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter."
    } else if (input.length > 1) {
        message.innerText = "Please enter one leter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter letters from a-z."
    } else {
        return input
    }
}

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guesses that letter, try again"
    } else {
        guessedLetters.push(guess)
        console.log(guessedLetters)
        showGuessedLetters()
        updateGuessesRemaining()
        updateWordInProgress(guessedLetters)

    }
}

const showGuessedLetters = function() {
    guesssedLettersElement.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guesssedLettersElement.append(li)
    }

}


const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("")
    checkIfWin();
}

const updateGuessesRemaining = function(guess) {
    word.toUpperCase()
    if (!word.includes(guessedLetters)) {
        message.innerText = "This word doesn't include this letter"
        remainingGuesses -= 1
    } else {
        message.innerText = "Man your good at this!"
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `You lose! Game over! The word was <span class="highlight">${word}</span>.`;
      } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
      } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }
}

const checkIfWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
}