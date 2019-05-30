import fs from 'fs'
import path from 'path'
import * as Config from '../config/config'

console.log(Config)

const outputRelative = "out"
const deckRelative = "decks"

const relativeDirs = [outputRelative, deckRelative]

export function InitRelativeDirs() {
	relativeDirs.forEach(item => {
		if (!fs.existsSync(path.join(Config.BaseDir, item))) fs.mkdirSync(path.join(Config.BaseDir, item))
	})
}

export function SavePlayerLife(player, life) {
	saveFile(path.join(outputRelative, player + ".life"), life)
}

export function SavePlayerPoison(player, poison) {
	saveFile(path.join(outputRelative, player + ".psn"), poison)
}

export function SavePlayerDeck(player, deck) {
	saveFile(path.join(outputRelative, player + ".deck"), deck)
}

export function SavePlayerName(player, name) {
	saveFile(path.join(outputRelative, player + ".name"), name)
}

export function ReadDecks(format) {
	return fs.readFileSync(path.join(Config.BaseDir, deckRelative, format + ".txt"), 'utf-8')
}

export function GetFormats() {
	return fs.readdirSync(path.join(Config.BaseDir, deckRelative)).map((item) => path.parse(item).name)
}

export function SaveDecks(format, decksFormatted) {
	saveFile(path.join(deckRelative, format + ".txt"), decksFormatted)
}

function saveFile(relativePath, data) {
	fs.writeFile(path.join(Config.BaseDir, relativePath), data, () => {})
}