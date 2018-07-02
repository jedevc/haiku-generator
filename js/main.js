const noun = require('../words/nouns.txt').split('\n')
const adjective = require('../words/adjectives.txt').split('\n')

const nlp = require('compromise')

window.onload = () => {
  let haiku = new Haiku()
  for (let i = 0; i < 20; i++) {
    console.log(haiku.generate())
  }
}

class Haiku {
  constructor() {
  }

  generate() {
    return [
      this.part(5),
      this.part(7),
      this.part(5)
    ].join('\n')
  }

  part(syllables) {
    let ln
    do {
      ln = this.line()
    } while (ln.syllables != syllables)
    return ln.word
  }

  line() {
    return this.noun()
  }

  noun() {
    let base = randomWord(noun)
    if (Math.random() < 0.4) {
      base = this.adjective().add(base)
    }

    const n = Math.random()
    if (n < 0.25) {
      return new Word('the').add(base)
    } else if (n < 0.5) {
      try {
        const article = nlp(base.word).nouns().articles()[0].article
        return new Word(article).add(base)
      } catch (e) {
        if (e instanceof TypeError) {
          return new Word('the').add(base)
        } else {
          throw e
        }
      }
    } else {
      return base
    }
  }

  adjective() {
    return randomWord(adjective)
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
      return new Word(parts[0], Number(parts[1]))
    }
  }

  return null
}

class Word {
  constructor(word, syllables=null) {
    this.word = word

    if (syllables == null) {
      // simple cheat syllable count
      this.syllables = word.split(/[ aeiou]/)
                           .filter(s => s.length != 0)
                           .length
    } else {
      this.syllables = syllables
    }
  }

  add(other) {
    return new Word(this.word + ' ' + other.word,
                    this.syllables + other.syllables)
  }
}
