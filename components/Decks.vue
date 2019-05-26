<template>
	<div>
		<v-select v-bind:items="decks" v-model="selectedDeck" autocomplete v-on:change="deckChange" @keyup.enter="addValue"></v-select>
	</div>
</template>

<script>
import fs from "fs"
import path from "path"
import * as Config from '../config/config'
import {ipcRenderer} from 'electron'

var deckFolder = "decks"

export default {
	data () {
		var self = this
		ipcRenderer.on('update-deck', (event, deck) => {
			self.decks.push(deck)
		})
		return {
			decks: JSON.parse(ipcRenderer.sendSync('get-deck', deckFolder))[this.format],
			selectedDeck: undefined
		}
	},
	props: {
		format: String,
	},
	watch: {
		format: function(newVal, oldVal) {
			this.decks = JSON.parse(ipcRenderer.sendSync('get-deck', deckFolder))[this.format]
			this.selectedDeck = undefined
		}
	},
	methods: {
		addValue: function(e){
			ipcRenderer.send('add-deck', this.format, e.target.value)
			this.decks.push(e.target.value)
			this.selectedDeck = e.target.value
		},
		deckChange: function(e){
			this.$emit('deck-change', this.selectedDeck)
		}
	}
}
</script>

