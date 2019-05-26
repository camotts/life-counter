<template>
	<v-app>
		<v-select v-bind:items="formats" v-model="selectedFormat"></v-select>
		<section class="container">
			<player name=player1 v-bind:format="selectedFormat" class="player"></player>
			<player name=player2 v-bind:format="selectedFormat" class="player"></player>
			<div> TODO: Add Round </div>
			<div> TODO: Add Current Match Score </div>
			<div> TODO: Some option menu to change base dir </div>
		</section>
	</v-app>
</template>

<script>
import Player from '../components/Player'
import fs from "fs"
import path from "path"
import * as Config from '../config/config'

var formatFolder = "formats"

export default {
	components: {Player},
	data () {
		return {
			formats: [],
			selectedFormat: undefined
		}
	},
	beforeMount() {
		// Load formats
		if (!fs.existsSync(path.join(Config.BaseDir, formatFolder))){
			fs.mkdirSync(path.join(Config.BaseDir, formatFolder))
			var normalFormats = "Standard\nModern"
			try {
				fs.writeFileSync(path.join(Config.BaseDir, formatFolder,  "formats.txt"), normalFormats, 'utf-8')
			}
			catch(e) {
				alert("Unable to save to file: " + e)
			}
		}
		console.log("Trying to load formats")
		var data = fs.readFileSync(path.join(Config.BaseDir, formatFolder,  "formats.txt"), 'utf-8')
		this.formats = data.split("\n")
		this.selectedFormat = this.formats[0]
	}
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.player {
	margin: 10%;
}
</style>
