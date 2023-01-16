import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(8)

  const screen = createScreen(50, 6)
  input.forEach((instruction) => processInstruction(instruction, screen))
  let sum = 0
  for (const row of screen) {
    for (const cell of row) {
      if (cell) sum++
    }
  }
  console.log(sum)
}

export async function part2() {
  const input = await getInput(8)

  const screen = createScreen(50, 6)
  input.forEach((instruction) => processInstruction(instruction, screen))
  for (const row of screen) {
    let line = ''
    for (const cell of row) {
      line += cell ? '█' : ' '
    }
    console.log(line)
  }
}

function createScreen(width, height) {
  const screen = []
  for (let y = 0; y < height; y++) {
    screen[y] = []
    for (let x = 0; x < width; x++) {
      screen[y][x] = 0
    }
  }
  return screen
}

function processInstruction(instruction, screen) {
  if (instruction.startsWith('rect')) {
    const [w, h] = instruction.substring(5).split('x')
    for (let y = 0; y < +h; y++) {
      for (let x = 0; x < +w; x++) {
        screen[y][x] = 1
      }
    }
  } else if (instruction.startsWith('rotate row')) {
    const [y, by] = instruction.substring(13).split(' by ')
    const width = screen[0].length
    const tmp = []
    for (let x = 0; x < width; x++) {
      tmp[(x + +by) % width] = screen[y][x]
    }
    for (let x = 0; x < width; x++) {
      screen[y][x] = tmp[x]
    }
  } else if (instruction.startsWith('rotate col')) {
    const [x, by] = instruction.substring(16).split(' by ')
    const height = screen.length
    const tmp = []
    for (let y = 0; y < height; y++) {
      tmp[(y + +by) % height] = screen[y][x]
    }
    for (let y = 0; y < height; y++) {
      screen[y][x] = tmp[y]
    }
  } else {
    throw new Error('Unexpected instruction: ' + instruction)
  }
}
