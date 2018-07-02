const txt = require('../samples/nouns.txt')

const nlp = require('compromise')

window.onload = () => {
  console.log(txt)

  let str = nlp('dinosaur').nouns().toPlural().out('text')
  console.log(str)
}
