import md5 from 'md5'

export async function part1() {
  const salt = 'ahsbgdzn'
  const analyzed = []
  for (let i = 0; i <= 1_000; i++) {
    analyzed[i] = analyzeHash(md5(salt + i))
  }
  let i = 0
  let foundCount = 0
  while (foundCount < 64) {
    const current = analyzed.shift()
    if (current.triples) {
      for (const next of analyzed) {
        if (next.quintuplets.has(current.triples)) {
          console.log(i, current.triples)
          foundCount++
        }
      }
    }
    analyzed.push(analyzeHash(md5(salt + (i + 1001))))
    i++
  }
}

export async function part2() {
  const salt = 'ahsbgdzn'
  const analyzed = []
  for (let i = 0; i <= 1_000; i++) {
    analyzed[i] = analyzeHash(stretchedMd5(salt + i))
  }
  let i = 0
  let foundCount = 0
  while (foundCount < 64) {
    const current = analyzed.shift()
    if (current.triples) {
      for (const next of analyzed) {
        if (next.quintuplets.has(current.triples)) {
          console.log(i, current.triples)
          foundCount++
        }
      }
    }
    analyzed.push(analyzeHash(stretchedMd5(salt + (i + 1001))))
    i++
  }
}

function stretchedMd5(value) {
  let current = value

  for (let i = 0; i < 2017; i++) {
    current = md5(current)
  }

  return current
}

function analyzeHash(hash) {
  const result = {
    triples: null,
    quintuplets: new Set(),
  }

  let foundTriplet = false
  for (let i = 0; i < hash.length - 2; i++) {
    if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
      if (!foundTriplet) {
        result.triples = hash[i]
        foundTriplet = true
      }

      if (i < hash.length - 4 && hash[i] === hash[i + 3] && hash[i] === hash[i + 4]) {
        result.quintuplets.add(hash[i])
      }
    }
  }

  return result
}
