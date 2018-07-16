function process(content) {
  return content
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length != 0)
}

module.exports = {
  noun: process(require('../words/nouns.txt')),
  adjective: process(require('../words/adjectives.txt')),
  verb: process(require('../words/verbs.txt'))
}
