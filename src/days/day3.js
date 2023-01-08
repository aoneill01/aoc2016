import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(3)

  let possible = 0

  for (const line of input) {
    const sides = line
      .trim()
      .split(/\s+/)
      .map((v) => +v)
      .sort((a, b) => a - b)
    if (sides[0] + sides[1] > sides[2]) possible++
  }

  console.log(possible)
}

export async function part2() {
  const input = await getInput(3)

  let possible = 0

  for (let i = 0; i < input.length; i += 3) {
    const r1 = input[i]
      .trim()
      .split(/\s+/)
      .map((v) => +v)
    const r2 = input[i + 1]
      .trim()
      .split(/\s+/)
      .map((v) => +v)
    const r3 = input[i + 2]
      .trim()
      .split(/\s+/)
      .map((v) => +v)

    const t1 = [r1[0], r2[0], r3[0]].sort((a, b) => a - b)
    const t2 = [r1[1], r2[1], r3[1]].sort((a, b) => a - b)
    const t3 = [r1[2], r2[2], r3[2]].sort((a, b) => a - b)

    if (t1[0] + t1[1] > t1[2]) possible++
    if (t2[0] + t2[1] > t2[2]) possible++
    if (t3[0] + t3[1] > t3[2]) possible++
  }

  console.log(possible)
}
