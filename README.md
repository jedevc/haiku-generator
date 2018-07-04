# haiku-generator

Randomly generate haikus!

This is just a fun project that I created to play around with Natural Language
Processing and Generation techniques. The haikus that it generates should be at
the very least grammatically accurate, however, having the results actually be
semantically accurate is much more difficult and wasn't really one of the
goals.

You can access an online version of the site
[here](https://jedevc.github.io/haiku-generator/).

## Building

The build process for the project is split into two parts:

1. Generate the word lists using python and nltk

		$ pip install -r requirements.txt
		$ ./miner

2. Create the web page

		$ npm install
		$ npm run build

This will leave the web page result in `dist/`, ready to host right away.
