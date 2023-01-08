import { getInput } from '../helpers/getInput.js'
import md5 from 'md5'

const input = 'reyedfim'
// const input = 'abc'

export async function part1() {
  let result = ''

  for (let i = 0; result.length < 8; i++) {
    let hash = md5(input + i)
    if (hash.startsWith('00000')) {
      result += hash[5]
    }
  }

  console.log(result)
}

export async function part2() {
  let result = [null, null, null, null, null, null, null, null]
  let foundCount = 0

  for (let i = 0; foundCount < 8; i++) {
    let hash = md5(input + i)
    if (hash.startsWith('00000')) {
      const j = parseInt(hash[5], 16)
      if (j < 8 && result[j] === null) {
        result[j] = hash[6]
        foundCount++
      }
    }
  }

  console.log(result.join(''))
}
