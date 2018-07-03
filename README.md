# haiku-generator

Randomly generate haikus!

This project is still in active development, so don't expect it to generate
incredible results just yet.

## Building

The build process for the project is split into two parts:

1. Generate the word lists using python and nltk

		$ pip install -r requirements.txt
		$ ./miner

2. Create the web page

		$ npm install
		$ npm run build

This will leave the web page result in `dist/`, ready to host right away.
