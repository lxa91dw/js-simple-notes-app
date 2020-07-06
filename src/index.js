import Hangman from './hangman'
import { wordList, imageList } from './hangman'
import getPuzzle from './requests'

// each letter press cues this event
typedLetter.addEventListener('keypress', function (e) {
    const guess = String.fromCharCode(e.charCode)
    if (hangman1.status === 'Playing') {
        hangman1.makeGuess(guess)
        guessesP.textContent = `Guessed Letters:  ${hangman1.guessedLetters.sort()}`
        // puzzleP.textContent = hangman1.puzzle
        puzzleP.innerHTML = ''
        hangman1.puzzle.split('').forEach((letter) => {
            const letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleP.appendChild(letterEl)
        })
        remGuessesP.textContent = `Remaining guesses: ${hangman1.remainingGuesses}`
        hangmanImg.src = imageList[hangman1.remainingGuesses]
        statusP.textContent = `Game Status: ${hangman1.statusMessage}`
    } 
    if (hangman1.status.includes('winner')) {
        setWinningImage()
    } else if (hangman1.status.includes('Failed')) {
        setLosingImage()
    }
    typedLetter.value = ''
})

const setWinningImage = () => {
    hangmanImg.src = imageList[8]
}

const setLosingImage = () => {
    hangmanImg.src = imageList[9]
}

const hangmanDiv = document.querySelector("#hangmanMain")
const puzzleP = document.querySelector("#puzzle")
const gameTypeP = document.querySelector("#gameType")
const guessesP = document.querySelector("#guesses")
const remGuessesP = document.querySelector("#remainingGuesses")
const statusP = document.querySelector("#gameStatus")
const hangmanImg = document.querySelector("#hangmanImage")
let hangman1 = undefined

const clearGame = (puzzleType, puzzle) => {
    gameTypeP.textContent = puzzleType
    hangmanImg.src = imageList[hangman1.remainingGuesses]
    remGuessesP.textContent = `Remaining guesses: ${hangman1.remainingGuesses}`
    puzzleP.innerHTML = ''
    typedLetter.value = ''
    typedLetter.focus()
    hangman1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleP.appendChild(letterEl)
    })

    statusP.textContent = `Game Status: New Game`
    guessesP.textContent = 'Guessed Letters: '
}

const startRandomGame = async () => {
    const puzzle = await getPuzzle('3')
    hangman1 = new Hangman(puzzle, 7)
    clearGame('Game Type: Random 3 Word Puzzle', hangman1.puzzle)
}

const startLakeGame = () => {
    const whichWord = Math.floor(Math.random() * wordList.length)
    hangman1 = new Hangman(wordList[whichWord], 7)
    clearGame('Game Type: Random Lake Related Puzzle', hangman1.puzzle)
}


document.querySelector('#resetRandom').addEventListener('click', startRandomGame)

document.querySelector('#resetLake').addEventListener('click', startLakeGame)

startLakeGame();

