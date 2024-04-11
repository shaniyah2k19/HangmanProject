import readlineSync from "readline-sync";
import wordBank from "./word-bank.js";
//Using this function, a random word is selected from the given word bank
const pickRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex].toLowerCase();
};
// Checking where a letter is used in the word
const letterUsedInWord = (letter, word) => {
  return word.includes(letter);
};
// Old function Update function for the display that shows the predicted letters
const refreshDisplay = (word, guessedLetters) => {
  return word.replace(/./g, (char) => (guessedLetters.has(char) ? char : "_"));
};
// This is the main game function
const playHangmanGame = () => {
  console.log("\nWelcome to  Shaniyah Hangman Game!\nPress ctrl+c to stop\n");
  let wins = 0; // Variable used to track wins
  let losses = 0; // Variable used to track losses
  let playAgain = true; // Variable used to control whether or not to play again
  while (playAgain) {
    const wordToGuess = pickRandomWord() // Getting a random word to guess
    let guessedLetters = new Set(); // Set to store guessed letters
    let wrongGuesses = 0; // Variable used to incorrect guesses
    let gameOver = false; // Variable used to track if game is over ot not
    while (!gameOver) {
      const showWord = refreshDisplay(wordToGuess, guessedLetters); // Displaying the word & guesses
      console.log("\n Word to guess: ", showWord); // Displaying the word to guess
      const letter = readlineSync.question("Please try to guess a letter 😊: ").toLowerCase();
      if (guessedLetters.has(letter)) {
        console.log("You have already guessed this letter!");
        continue;
      }
      guessedLetters.add(letter); // Adding the guess letter to the set
      if (!letterUsedInWord(letter, wordToGuess)) { // Checking if the letter has already been guessed
        console.log("Incorrect Guess😂😂!");
        wrongGuesses++; // Incrementing wrong guess counter
      }
      console.log("Guessed Letters: ", [...guessedLetters].join(",")); // Displaying the guessed letters
      console.log("Remaining guesses: ", 6 - wrongGuesses); // Displaying the attempts left to guess
      if (wrongGuesses >= 6 || [...wordToGuess].every((char) => guessedLetters.has(char))) { // Checking if the game is over
        gameOver = true; // Setting game flag to true
        if (wrongGuesses >= 6) {
          console.log("\n This Game is Over!!! You have too many wrong guesses☹️. The correct word was: ", wordToGuess);
          losses++; // Incrementing losses counter
        } else {
          console.log("\n Congratulations🥳!!!! You have guessed the word which is:", wordToGuess);
          wins++;  // Incrementing wins counter
        }
      }
    }
    console.log("\n Wins:", wins); // Displaying total wins
    console.log("Losses: ", losses); // Displaying total losses
    const playAgainOption = readlineSync.question("Would you like to play again? (yes/no): ").toLowerCase();
    playAgain = playAgainOption === "yes";// Updating the playAgain variable based on the input from user
  }
  console.log("Thank you for playing my game! Hope you enjoyed it!");
};
playHangmanGame(); //Calling function to start game
