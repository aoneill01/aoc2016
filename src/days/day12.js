import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(12)

  const state = {
    ip: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  }

  run(input, state)

  console.log(state.a)
}

export async function part2() {
  const input = await getInput(12)

  const state = {
    ip: 0,
    a: 0,
    b: 0,
    c: 1,
    d: 0,
  }

  run(input, state)

  console.log(state.a)
}

function run(program, state) {
  while (state.ip >= 0 && state.ip < program.length) {
    const instruction = program[state.ip]
    const operation = instruction.substring(0, 3)

    switch (operation) {
      case 'cpy': {
        const [x, y] = instruction.substring(4).split(' ')
        state[y] = valueOf(x, state)
        state.ip++
        break
      }
      case 'inc': {
        const x = instruction.substring(4)
        state[x]++
        state.ip++
        break
      }
      case 'dec': {
        const x = instruction.substring(4)
        state[x]--
        state.ip++
        break
      }
      case 'jnz': {
        const [x, y] = instruction.substring(4).split(' ')
        if (valueOf(x, state) !== 0) {
          state.ip += parseInt(y, 10)
        } else {
          state.ip++
        }
        break
      }
      default:
        console.log('Unexpected instruction at instruction ' + state.ip)
    }
  }
}

function valueOf(x, state) {
  if (x.length === 1 && x.match(/[a-d]/)) {
    return state[x]
  }

  return parseInt(x, 10)
}
