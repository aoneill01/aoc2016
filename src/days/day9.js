import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(9)

  console.log(input.map((line) => decompress1(line).length).reduce((acc, length) => acc + length, 0))
}

export async function part2() {
  const input = await getInput(9)

  console.log(input.map((line) => decompress2Length(line)).reduce((acc, length) => acc + length, 0))
}

function decompress1(value) {
  let result = ''

  for (let i = 0; i < value.length; i++) {
    if (value[i] !== '(') {
      result += value[i]
    } else {
      const closing = value.indexOf(')', i + 1)
      const [length, repeat] = value.substring(i + 1, closing).split('x')
      const part = value.substring(closing + 1, closing + 1 + +length)
      for (let i = 0; i < +repeat; i++) result += part
      i = closing + +length
    }
  }

  return result
}

function decompress2Length(value) {
  if (!value.includes('(')) return value.length

  let result = 0

  for (let i = 0; i < value.length; i++) {
    if (value[i] !== '(') {
      result++
    } else {
      const closing = value.indexOf(')', i + 1)
      const [length, repeat] = value.substring(i + 1, closing).split('x')
      const part = value.substring(closing + 1, closing + 1 + +length)
      result += decompress2Length(part) * +repeat
      i = closing + +length
    }
  }

  return result
}
