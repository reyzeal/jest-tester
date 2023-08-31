import {describe, expect, test} from '@jest/globals';

import {w3cwebsocket} from "websocket"

for(let i=0;i<1000;i++){
    describe(`Unit#${i+1}`, () => {
        test('', async () => {
            let choice = "A"
            expect(await new Promise(resolve => {
                const c = new w3cwebsocket("ws://localhost:8080/", 'echo-protocol');
                c.onopen = function () {
                    c.send("jawaban-update") // API send post jawaban random (*A, B, C, D)
                }
                c.onmessage = function (message) {
                    c.close()
                    resolve(message.data)
                }
            })).toBe(choice)
        })
    })
}