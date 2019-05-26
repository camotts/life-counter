var fs = require('fs')
var path = require('path')
var Config = require('../config/config')
var os = require('os')

var loaded = false
var decks = {}

export function Decks (deckFolder) {
	if(!loaded) {
		console.log("Loading decks")
		if (!fs.existsSync(path.join(Config.BaseDir, deckFolder))) fs.mkdirSync(path.join(Config.BaseDir, deckFolder))
		fs.readdirSync(path.join(Config.BaseDir, deckFolder)).forEach(file => {
			decks[file.split('.')[0]] = fs.readFileSync(path.join(Config.BaseDir, deckFolder,  file), 'utf-8').split(os.EOL)
		})
		loaded = true
	}
	return decks
}

export function AddDeck(format, deck) {
	if (!decks[format].includes(deck)) decks[format].push(deck)
}

export function SaveDecks (deckFolder) {
	for(var key in decks) {
		fs.writeFileSync(path.join(Config.BaseDir, deckFolder,  key + ".txt"), decks[key].sort().join(os.EOL), 'utf-8')
	}
}
/*
if (!fs.existsSync(path.join(Config.BaseDir, deckFolder))) fs.mkdir(path.join(Config.BaseDir, deckFolder))
		console.log("Trying to load decks")
		fs.readdirSync(path.join(Config.BaseDir, deckFolder)).forEach(file => {
			console.log(file)
		})*/