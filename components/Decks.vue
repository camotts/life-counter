<template>
	<div>
		<v-select v-bind:items="decks" v-model="selectedDeck" autocomplete @keyup.enter="addValue"></v-select>
	</div>
</template>

<script>
import fs from "fs"
import path from "path"
import * as Config from '../config/config'
import {ipcRenderer} from 'electron'

var deckFolder = "decks"

console.log(ipcRenderer.sendSync('get-deck', deckFolder))
console.log(ipcRenderer.sendSync('get-deck', deckFolder)[this.format])

export default {
	data () {
		return {
			decks: ipcRenderer.sendSync('get-deck', deckFolder)[this.format],
			selectedDeck: undefined
		}
	},
	props: {
		format: String,
	},
	watch: {
		format: function(newVal, oldVal) {
			this.decks = ipcRenderer.sendSync('get-deck', deckFolder)[this.format]
			this.selectedDeck = undefined
		}
	},
	methods: {
		addValue: function(e){
			console.log(ipcRenderer.sendSync('get-deck', deckFolder))
			ipcRenderer.send('add-deck', this.format, e.target.value)
			this.decks.push(e.target.value)
			this.selectedDeck = e.target.value
    	}
	}
}
</script>

