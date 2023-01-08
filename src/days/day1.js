import { getInput } from '../helpers/getInput.js'

const north = {
  dx: 0,
  dy: -1,
}

const east = {
  dx: 1,
  dy: 0,
}

const south = {
  dx: 0,
  dy: 1,
}

const west = {
  dx: -1,
  dy: 0,
}

north.right = east
north.left = west

east.right = south
east.left = north

south.right = west
south.left = east

west.right = north
west.left = south

export async function part1() {
  const input = (await getInput(1))[0].split(', ')

  let x = 0,
    y = 0,
    dir = north

  for (const instruction of input) {
    if (instruction[0] === 'R') dir = dir.right
    else dir = dir.left

    x += dir.dx * +instruction.substring(1)
    y += dir.dy * +instruction.substring(1)
  }

  console.log(Math.abs(x) + Math.abs(y))
}

export async function part2() {
  const input = (await getInput(1))[0].split(', ')

  let x = 0,
    y = 0,
    dir = north

  const visited = new Set()
  visited.add(`${x},${y}`)

  outer: for (const instruction of input) {
    if (instruction[0] === 'R') dir = dir.right
    else dir = dir.left

    for (let i = 0; i < +instruction.substring(1); i++) {
      x += dir.dx
      y += dir.dy

      if (visited.has(`${x},${y}`)) {
        break outer
      }

      visited.add(`${x},${y}`)
    }
  }

  console.log(Math.abs(x) + Math.abs(y))
}
