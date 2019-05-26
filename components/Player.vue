<template>
    <div style="text-align:center">
		<div>
			<div>
				<v-text-field v-bind:value="playerName" placeholder="Name"></v-text-field>
				<decks  v-bind:format="format"></decks>
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
import fs from "fs"
import path from "path"
import * as Config from '../config/config'

var lifeFolder = "life"

export default {
	data: function() {
		return {
			life: 20,
			poison: 0,
		}
	},
	props: {
		name: String,
		playerName: String,
		format: String
	},
	components: { LifeButton, Decks },
	methods: {
		changeLife(change) {
			this.life = this.life + change
			try {
				fs.writeFileSync(path.join(Config.BaseDir, lifeFolder, this.name + ".life"), this.life, 'utf-8')
			}
			catch(e) {
				alert("Unable to save to file")
			}
		},
		changePoison(change) {
			this.poison = Math.max(this.poison + change, 0)
			try {
				fs.writeFileSync(path.join(Config.BaseDir, lifeFolder, this.name + ".psn"), this.poison, 'utf-8')
			}
			catch(e) {
				alert("Unable to save to file")
			}
		}
	},
	beforeMount() {
		if (!fs.existsSync(path.join(Config.BaseDir, lifeFolder))) fs.mkdir(path.join(Config.BaseDir, lifeFolder))
		try {
			fs.writeFileSync(path.join(Config.BaseDir, lifeFolder,  this.name + ".life"), this.life, 'utf-8')
			fs.writeFileSync(path.join(Config.BaseDir, lifeFolder, this.name + ".psn"), this.poison, 'utf-8')
		}
		catch(e) {
			alert("Unable to save to file: " + e)
		}
	}
};
</script>

