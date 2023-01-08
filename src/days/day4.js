import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(4)

  console.log(
    input
      .map((encryptedName) => new Room(encryptedName))
      .filter((room) => room.isValid())
      .reduce((acc, room) => acc + room.sectorId, 0)
  )
}

export async function part2() {
  const input = await getInput(4)

  console.log(
    input
      .map((encryptedName) => new Room(encryptedName))
      .find((room) => room.isValid() && room.decryptedName().includes('north')).sectorId
  )
}

class Room {
  constructor(encryptedName) {
    const regex = /(.+)-(\d+)\[(.+)\]/
    const match = regex.exec(encryptedName)
    this.sectorId = +match[2]
    this.checksum = match[3]
    this.name = match[1].split('-')
  }

  isValid() {
    const counts = {}

    for (const letter of this.name.join('')) {
      if (!counts.hasOwnProperty(letter)) counts[letter] = 0
      counts[letter]++
    }

    const correctChecksum = Object.entries(counts)
      .sort((a, b) => {
        if (a[1] > b[1]) return -1
        if (a[1] < b[1]) return 1
        return a[0].localeCompare(b[0])
      })
      .map((e) => e[0])
      .join('')
      .substring(0, 5)

    return correctChecksum === this.checksum
  }

  decryptedName() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let result = []
    for (const word of this.name) {
      let decryptedWord = ''
      for (const letter of word) {
        const i = alphabet.indexOf(letter)
        const decryptedLetter = alphabet[(i + this.sectorId) % alphabet.length]
        decryptedWord += decryptedLetter
      }
      result.push(decryptedWord)
    }

    return result.join(' ')
  }
}
