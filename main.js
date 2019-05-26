/*
**  Nuxt
*/
import http from 'http'
import { Nuxt, Builder } from 'nuxt'
import config from './nuxt.config.js'
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
	builder.build().catch(err => {
		console.error(err) // eslint-disable-line no-console
		process.exit(1)
	})
}
// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null // Current window
import {app, BrowserWindow, ipcMain} from 'electron'
import * as path from 'path'
import * as DeckHandler from './dataHandlers/decks'

const newWin = () => {
	win = new BrowserWindow({
		icon: path.join(__dirname, 'static/icon.png'),
		webPreferences: {
            nodeIntegration: true
		},
		title: 'test'
	})
	win.maximize()
	win.on('closed', () => win = null)
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
		installExtension(VUEJS_DEVTOOLS.id).then(name => {
			console.log(`Added Extension:  ${name}`)
			win.webContents.openDevTools()
		}).catch(err => console.log('An error occurred: ', err))
		// Wait for nuxt to build
		const pollServer = () => {
			http.get(_NUXT_URL_, (res) => {
				if (res.statusCode === 200) { win.loadURL(_NUXT_URL_) } else { setTimeout(pollServer, 300) }
			}).on('error', pollServer)
		}
		pollServer()
	} else { return win.loadURL(_NUXT_URL_) }
}

ipcMain.on('get-deck', (event, deckPath) => {
	event.returnValue = JSON.stringify(DeckHandler.Decks(deckPath))
})

ipcMain.on('add-deck', (event, format, deck) => {
	DeckHandler.AddDeck(format, deck)
	win.webContents.send('update-deck', deck)
})

app.on('ready', newWin)
app.on('window-all-closed', () => {
	DeckHandler.SaveDecks("decks")
	app.quit()
})
app.on('activate', () => win === null && newWin())
