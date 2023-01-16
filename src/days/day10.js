import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(10)

  const { bots } = createBots(input)
  consumeValues(input, bots)
  for (const bot of bots) {
    if (bot.values.includes(61) && bot.values.includes(17)) console.log(bot.id)
  }
}

export async function part2() {
  const input = await getInput(10)

  const { bots, outputs } = createBots(input)
  consumeValues(input, bots)

  console.log(outputs[0] * outputs[1] * outputs[2])
}

function createBots(input) {
  const bots = []
  const outputs = []

  const regex = /bot (\d+) gives low to (\S+) (\d+) and high to (\S+) (\d+)/

  for (const instruction of input) {
    const match = regex.exec(instruction)

    if (match) {
      const id = +match[1]
      const bot = {
        id,
        values: [],
        processValue(value) {
          this.values.push(value)
          if (this.values.length === 2) {
            const [min, max] = this.values.sort((a, b) => a - b)

            if (match[2] === 'bot') {
              bots[+match[3]].processValue(min)
            } else {
              outputs[+match[3]] = min
            }

            if (match[4] === 'bot') {
              bots[+match[5]].processValue(max)
            } else {
              outputs[+match[5]] = max
            }
          }
        },
      }
      bots[id] = bot
    }
  }

  return { bots, outputs }
}

function consumeValues(input, bots) {
  const regex = /value (\d+) goes to bot (\d+)/

  for (const instruction of input) {
    const match = regex.exec(instruction)

    if (match) {
      bots[+match[2]].processValue(+match[1])
    }
  }
}
