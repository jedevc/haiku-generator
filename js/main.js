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
    return ln.text
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
      return new Text('the').add(base)
    } else if (n < 0.5) {
      try {
        const article = nlp(base.text).nouns().articles()[0].article
        return new Text(article).add(base)
      } catch (e) {
        if (e instanceof TypeError) {
          return new Text('the').add(base)
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
      return new Text(parts[0], Number(parts[1]))
    }
  }

  return null
}

class Text {
  constructor(text, syllables=null) {
    this.text = text

    if (syllables == null) {
      // simple cheat syllable count
      this.syllables = text.split(/[ aeiou]/)
                           .filter(s => s.length != 0)
                           .length
    } else {
      this.syllables = syllables
    }
  }

  add(other) {
    return new Text(this.text + ' ' + other.text,
                    this.syllables + other.syllables)
  }
}
