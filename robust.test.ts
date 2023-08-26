import {DefaultEventsMap} from '@socket.io/component-emitter'
import {Socket as CSocket, io} from 'socket.io-client'

describe('Socket.io client test', () => {
  let clientSocket: CSocket<DefaultEventsMap, DefaultEventsMap>
  const options = ['A', 'B', 'C', 'D']
  const apiURL =
    'https://rest.depasinfection.com/api/peserta/olimpiade/ujian/7/soal/5'

  beforeAll(async () => {
    clientSocket = io('https://sockets.depasinfection.com', {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.orDzbH8qzCTmonYR2jvCzOSYATH5cvJ5JJxmT5E_fCE',
      },
      transports: ['polling'],
    })

    await new Promise(resolve => {
      clientSocket.on('connect', () => {
        console.log('connected: ', clientSocket.connected)
        resolve(true)
      })
    })
  })

  afterAll(() => {
    clientSocket.close()
  })

  for (let i = 0; i < 100; i++) {
    it(`mengirim jawaban ke #${i + 1}?`, async () => {
      const randomIndex = Math.floor(Math.random() * options.length)

      try {
        console.log('mengirim jawaban: ', options[randomIndex])
        const res = await fetch(apiURL, {
          method: 'POST',
          body: JSON.stringify({
            jawaban: options[randomIndex],
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzBmNDBjYjI1OTdjOTlhZjMzMzAxZWMxZDlhZGIwZWZkYjYwMDNmN2E1N2FmOTYyMmZlODkzZTFhNTA5ODRhODJmYTg5MzcwYjUwYjcwZjQiLCJpYXQiOjE2OTMwMzAwODIsIm5iZiI6MTY5MzAzMDA4MiwiZXhwIjoxNzI0NjUyNDgyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.tkBrfa_CVFXnYi8sPGO8ItDWPmzO8xcRyKE6eoM5Ef9cnUoCwZ3bfjBObyFG5xsF8pZseW-i3MfQNZ-i1Q60X6szLAb84XfAsKd7-31aGlfb6R2iGQ2s3QgsdoHQ_HwhtxDrgpFlZmdKaB8nWqc8YcWjduOff9ZmzwFjSc4LMw5feqdae4DKh7warB92KtVYTiiy61qr4mWfgie_i1rBcWy9OKIiJ1Z1q12uplNzRiJH0kC0FTAho9Au6Jil_-wqgxw9Qub9ql4jxbkfwAZXBlJvCGbqGlM636vPcGKVhmUoTYz9Crcp4AD3Zhxy3d59R-kaUTE2TTUdPXwXTUHna6Oa1dwItLNUm_K77IvbPbLYfITutQ7ldwiOB1BYaKXQC0YqM8kWU9gopAKMiPrhFtno6H-Dy1IYdILgFysYggUggtz9dA8QWWl1aVQfhwRBpjflIn-WpCU4B4RpEeq7rh8JBapTVfAl3Ph03ssmBirldyDOAF8nfkA6I4q9H1FuUy8zZLQgdmm1DYoLp4shBG5ExzMLCJXqG8A9s03OSzJYvQRSEyPuts1RFwMJDCsjmI_aNeieETwspEYDTzTG-WIbYP5-ObhntAHPmlOtVyHp0uXJvYVVy0ra6Np73hInAdO2MMkxtiwOXY1ouZddNAqedOLKEJlnMZnB_rWvDsQ',
          },
        })
        const payload = await res.json()

        await new Promise(resolve => {
          clientSocket.on('jawaban-update', res => {
            console.log('RECEIVED: ', res.pilihan)
            expect(payload.data.pilihan).toEqual(res.pilihan)
            resolve(true)
          })
        })
      } catch {
        console.error('Terjadi kesalahan saat mengirim jawaban')
      }
    })
  }
})
