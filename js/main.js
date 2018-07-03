const noun = require('../words_build/nouns.txt').split('\n')
const adjective = require('../words_build/adjectives.txt').split('\n')
const verb = require('../words_build/verbs.txt').split('\n')

const nlp = require('compromise')
const syllable = require('syllable')

window.onload = () => {
  let haiku = new Haiku()

  let destination = document.getElementById('haiku')

  function update() {
    destination.addEventListener('transitionend', () => {
      // remove existing lines
      while (destination.firstChild) {
        destination.removeChild(destination.firstChild)
      }

      // add lines
      const lines = haiku.generate()
      for (let line of lines) {
        let span = document.createElement('div')
        span.classList.add('line')
        let text = document.createTextNode(line)
        span.appendChild(text)

        destination.appendChild(span)
      }

      destination.classList.remove('hidden')
    }, { once: true})
    destination.classList.add('hidden')
  }

  update()
  destination.addEventListener('click', update)
  window.addEventListener('keyup', e => {
    if (e.key == ' ' || e.key == 'Enter') update()
  })
}

class Haiku {
  constructor() {
  }

  generate() {
    return [
      this.part(5),
      this.part(7),
      this.part(5)
    ]
  }

  part(syllables) {
    let ln
    do {
      ln = this.line()
    } while (syllable(ln) != syllables)

    return ln[0].toUpperCase() + ln.slice(1)
  }

  line() {
    const n = Math.random()
    if (n < 0.3) {
      return this.noun()
    } else if (n < 0.4) {
      return this.noun() + ', ' + this.noun()
    } else if (n < 0.5) {
      return this.noun() + ', ' + this.noun() + ', ' + this.noun()
    } else if (n < 1) {
      let verb = this.verb()

      let past = nlp(verb).verbs().toPastTense().out('text')
      if (past) verb = past

      return this.noun() + ' ' + verb
    }
  }

  noun() {
    let base = randomChoice(noun)
    if (Math.random() < 0.4) {
      base = this.adjective() + ' ' + base
    }

    const n = Math.random()
    if (n < 0.25) {
      return 'the ' + base
    } else if (n < 0.5) {
      try {
        const article = nlp(base.text).nouns().articles()[0].article
        return article + ' ' + base
      } catch (e) {
        if (e instanceof TypeError) {
          return 'the ' + base
        } else {
          throw e
        }
      }
    } else {
      return base
    }
  }

  adjective() {
    return randomChoice(adjective)
  }

  verb() {
    return randomChoice(verb)
  }
}

function randomChoice(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
