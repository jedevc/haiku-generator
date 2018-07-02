const nouns = require('../words/nouns.txt').split('\n')

const nlp = require('compromise')

window.onload = () => {
  for (let i = 0; i < 10; i++) {
    console.log(randomWord(nouns))
  }
}

function randomChoice(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function randomWord(array, repeat=true) {
  while (repeat) {
    const choice = randomChoice(array)
    const parts = choice.split(' ')
    if (parts.length == 2) {
      return {
        word: parts[0],
        syllables: parts[1]
      }
    }
  }

  return null
}
