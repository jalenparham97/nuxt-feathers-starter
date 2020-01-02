import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const storage = new CookieStorage()

const socket = io(process.env.apiURL, { transports: ['websocket'] })

const app = feathers()
app.configure(socketio(socket))
app.configure(auth({ storage }))

export default app
