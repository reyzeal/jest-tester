import {DefaultEventsMap} from '@socket.io/component-emitter'
import {Socket as CSocket, io} from 'socket.io-client'

describe('Socket.io client test', () => {
  let clientSocket: CSocket<DefaultEventsMap, DefaultEventsMap>

  beforeAll(() => {
    clientSocket = io('https://socket2.depasinfection.com', {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.orDzbH8qzCTmonYR2jvCzOSYATH5cvJ5JJxmT5E_fCE',
      },
    })
  })

  afterAll(() => {
    clientSocket.close()
  })

  test('is connected?', () => {
    console.log('connected: ', clientSocket.connected)
    clientSocket.on('connect', () => {
      console.log('connected: ', clientSocket.connected)
    })
  })
})
