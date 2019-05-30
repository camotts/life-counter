var fs = require('fs')
var path = require('path')
var Config = require('../config/config')
var os = require('os')

import {GetFormats, ReadDecks, SaveDecks as SD} from "./output"

var loaded = false
var decks = {}

export function Decks () {
	if(!loaded) {
		GetFormats().forEach(format => {
			decks[format] = ReadDecks(format).split(os.EOL)
		})
		loaded = true
	}
	return decks
}

export function AddDeck(format, deck) {
	if (!decks[format].includes(deck)) decks[format].push(deck)
}

export function SaveDecks () {
	for(var key in decks) {
		SD(key, decks[key].sort().join(os.EOL))
	}
}
/*
if (!fs.existsSync(path.join(Config.BaseDir, deckFolder))) fs.mkdir(path.join(Config.BaseDir, deckFolder))
		console.log("Trying to load decks")
		fs.readdirSync(path.join(Config.BaseDir, deckFolder)).forEach(file => {
			console.log(file)
		})*/