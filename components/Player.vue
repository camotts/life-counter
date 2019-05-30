<template>
    <div style="text-align:center">
		<div>
			<div>
				<v-text-field v-model="playerName" placeholder="Name"></v-text-field>
				<decks v-bind:format="format" v-on:deck-change="changeDeck"></decks>
			</div>
			<div>
				{{life}}
				<span v-if="poison>0">{{poison}}</span>
			</div>
		</div>
		<div>
			<life-button style="display: inline-block" :amount=-1 v-on:life-change="changeLife"></life-button>
			<life-button style="display: inline-block" :amount=1 v-on:life-change="changeLife"></life-button>
		</div>
		<div>
			<life-button style="display: inline-block" :amount=-5 v-on:life-change="changeLife"></life-button>
			<life-button style="display: inline-block" :amount=+5 v-on:life-change="changeLife"></life-button>
		</div>
		<!--Poison-->
    	<div>
			<img src="@/assets/img/poison.svg" height="15%" width="15%">
    	</div>
		<div>
			<life-button style="display: inline-block" :amount=-1 v-on:life-change="changePoison"></life-button>
			<life-button style="display: inline-block" :amount=1 v-on:life-change="changePoison"></life-button>
		</div>
    </div>
</template>

<script>
import LifeButton from "./LifeButton"
import Decks from "./Decks"
import path from "path"
import * as Config from '../config/config'
import {ipcRenderer} from 'electron'

var lifeFolder = "out"

export default {
	data: function() {
		return {
			playerName: "",
			life: 20,
			poison: 0,
		}
	},
	props: {
		name: String,
		format: String
	},
	components: { LifeButton, Decks },
	methods: {
		changeLife(change) {
			this.life = this.life + change
			ipcRenderer.send('save-player-life', this.name, this.life)
		},
		changePoison(change) {
			this.poison = Math.max(this.poison + change, 0)
			ipcRenderer.send('save-player-poison', this.name, this.poison)
		},
		changeDeck(change) {
			ipcRenderer.send('save-player-deck', this.name, change)
		}
	},
	beforeMount() {
		ipcRenderer.send('save-player-life', this.name, this.life)
		ipcRenderer.send('save-player-poison', this.name, this.poison)
	},
	watch: {
		playerName: function(newVal, oldVal) {
			ipcRenderer.send('save-player-name', this.name, this.playerName)
		}
	}
};
</script>

