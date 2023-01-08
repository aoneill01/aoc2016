import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(6)
  const frequencies = []

  for (const message of input) {
    for (let i = 0; i < message.length; i++) {
      if (!frequencies[i]) frequencies[i] = {}

      if (!frequencies[i].hasOwnProperty(message[i])) frequencies[i][message[i]] = 0
      frequencies[i][message[i]]++
    }
  }

  console.log(frequencies.map((f) => Object.entries(f).sort((a, b) => b[1] - a[1])[0][0]).join(''))
}

export async function part2() {
  const input = await getInput(6)
  const frequencies = []

  for (const message of input) {
    for (let i = 0; i < message.length; i++) {
      if (!frequencies[i]) frequencies[i] = {}

      if (!frequencies[i].hasOwnProperty(message[i])) frequencies[i][message[i]] = 0
      frequencies[i][message[i]]++
    }
  }

  console.log(frequencies.map((f) => Object.entries(f).sort((a, b) => a[1] - b[1])[0][0]).join(''))
}
