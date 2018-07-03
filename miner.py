import argparse
import sys
import os

import nltk
from nltk.corpus import wordnet as wn
from nltk.corpus.reader.wordnet import WordNetError
import re

def main():
    # location constants
    indir = 'samples'
    outdir = 'words'

    # ensure that output directory exists
    os.makedirs(outdir, exist_ok=True)

    for basename in os.listdir(indir):
        # read in instructions
        with open(os.path.join(indir, basename)) as infile:
            instructions = [line.strip() for line in infile]

        # process instructions
        proc = Processor()
        result = proc.process(instructions)

        # print out results
        with open(os.path.join(outdir, basename), 'w') as outfile:
            for word in result:
                print(word, file=outfile)

class Processor:
    def __init__(self):
        # shakespeare = [nltk.corpus.shakespeare.words(text) for text in nltk.corpus.shakespeare.fileids()]
        # shakespeare = [word for text in shakespeare for word in text]

        self.tagged_words = set()
        # self.tagged_words.update(nltk.pos_tag(shakespeare))
        self.tagged_words.update(nltk.corpus.brown.tagged_words())

    def process(self, instructions):
        final = set()

        targets = set()
        for instruction in instructions:
            if len(instruction) > 0:
                if instruction[0] == '[' and instruction[-1] == ']':
                    base = instruction[1:-1].lower()
                    if '.' not in base:  # default to noun
                        base += '.n'
                    base += '.01'

                    targets.add(wn.synset(base))
                else:
                    final.add(instruction)

        final.update(self.find_similar(targets))

        return final

    def find_similar(self, synsets):
        similar = set()
        for word, tag in self.tagged_words:
            wntype = self._penn_to_wn(tag)
            if wntype is None: continue

            for synset in synsets:
                if wntype == synset.pos():
                    try:
                        wordsyn = wn.synsets(word, pos=wntype)[0]
                        if synset.path_similarity(wordsyn) > 0.15:
                            similar.add(word.lower())
                            break
                    except (IndexError, TypeError):
                        continue
        return similar

    def _penn_to_wn(self, tag):
        if len(tag) == 0: return None

        if tag[0] == 'N':
            return wn.NOUN
        elif tag[0] == 'V':
            return wn.VERB
        elif tag[0] == 'J':
            return wn.ADJ
        else:
            return None

if __name__ == "__main__":
    main()
