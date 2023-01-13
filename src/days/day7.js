import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(7)

  console.log(input.map(parse).filter(supportsTLS).length)
}

export async function part2() {
  const input = await getInput(7)

  console.log(input.map(parse).filter(supportsSSL).length)
}

function parse(ip) {
  const parts = []
  let isHypernet = false
  let currentPart = { isHypernet, value: '' }
  parts.push(currentPart)
  for (let i = 0; i < ip.length; i++) {
    const char = ip[i]
    switch (char) {
      case '[':
        isHypernet = true
        currentPart = { isHypernet, value: '' }
        parts.push(currentPart)
        break
      case ']':
        isHypernet = false
        currentPart = { isHypernet, value: '' }
        parts.push(currentPart)
        break
      default:
        currentPart.value += char
    }
  }

  for (const part of parts) part.isABBA = checkIsABBA(part.value)

  return parts
}

function checkIsABBA(part) {
  for (let i = 0; i < part.length - 3; i++) {
    if (part[i] === part[i + 3] && part[i + 1] === part[i + 2] && part[i] !== part[i + 1]) {
      return true
    }
  }
  return false
}

function supportsTLS(parts) {
  let foundABBA = false
  for (const part of parts) {
    if (part.isHypernet && checkIsABBA(part.value)) return false
    if (!foundABBA && !part.isHypernet) foundABBA = checkIsABBA(part.value)
  }
  return foundABBA
}

function supportsSSL(parts) {
  const abas = parts.filter((part) => !part.isHypernet).flatMap((part) => findABAs(part.value))
  return abas
    .map(abaToBAB)
    .some((bab) => parts.filter((part) => part.isHypernet).some((part) => part.value.includes(bab)))
}

function findABAs(part) {
  const results = []
  for (let i = 0; i < part.length - 2; i++) {
    if (part[i] === part[i + 2] && part[i] !== part[i + 1]) {
      results.push(`${part[i]}${part[i + 1]}${part[i + 2]}`)
    }
  }
  return results
}

function abaToBAB(aba) {
  return aba.substring(1) + aba[1]
}
