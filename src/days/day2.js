import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(2)

  const one = {
    value: '1',
  }
  const two = {
    value: '2',
  }
  const three = {
    value: '3',
  }
  const four = {
    value: '4',
  }
  const five = {
    value: '5',
  }
  const six = {
    value: '6',
  }
  const seven = {
    value: '7',
  }
  const eight = {
    value: '8',
  }
  const nine = {
    value: '9',
  }

  one.R = two
  one.D = four

  two.R = three
  two.D = five
  two.L = one

  three.L = two
  three.D = six

  four.R = five
  four.U = one
  four.D = seven

  five.U = two
  five.R = six
  five.D = eight
  five.L = four

  six.U = three
  six.L = five
  six.D = nine

  seven.U = four
  seven.R = eight

  eight.L = seven
  eight.U = five
  eight.R = nine

  nine.U = six
  nine.L = eight

  console.log(process(input, five))
}

export async function part2() {
  const input = await getInput(2)

  const one = {
    value: '1',
  }
  const two = {
    value: '2',
  }
  const three = {
    value: '3',
  }
  const four = {
    value: '4',
  }
  const five = {
    value: '5',
  }
  const six = {
    value: '6',
  }
  const seven = {
    value: '7',
  }
  const eight = {
    value: '8',
  }
  const nine = {
    value: '9',
  }
  const a = {
    value: 'A',
  }
  const b = {
    value: 'B',
  }
  const c = {
    value: 'C',
  }
  const d = {
    value: 'D',
  }

  one.D = three

  two.R = three
  two.D = six

  three.U = one
  three.L = two
  three.R = four
  three.D = seven

  four.L = three
  four.D = eight

  five.R = six

  six.U = two
  six.R = seven
  six.D = a
  six.L = five

  seven.U = three
  seven.R = eight
  seven.D = b
  seven.L = six

  eight.U = four
  eight.R = nine
  eight.D = c
  eight.L = seven

  nine.L = eight

  a.U = six
  a.R = b

  b.U = seven
  b.R = c
  b.D = d
  b.L = a

  c.U = eight
  c.L = b

  d.U = b

  console.log(process(input, five))
}

function process(instructions, start) {
  let result = ''
  let button = start

  for (const line of instructions) {
    for (const direction of line.split('')) {
      if (button.hasOwnProperty(direction)) {
        button = button[direction]
      }
    }

    result += button.value
  }

  return result
}
