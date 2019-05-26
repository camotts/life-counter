import Vue from 'Vue'
import Vuetify from '@nuxtjs/vuetify'
import poison from "../icons/poison"

const ICONS = {
	'poison': {
		component: poison
	}
}

Vue.use(Vuetify, {
	icons: ICONS
})