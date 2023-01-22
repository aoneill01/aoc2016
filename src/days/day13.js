import memoize from 'memoizee'

export async function part1() {
  const isOpenSpaceMemo = memoize(isOpenSpace)
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ]
  const favoriteNumber = 1352
  const goal = { x: 31, y: 39 }

  let positions = new Set([serialize(1, 1)])
  let visited = new Set([serialize(1, 1)])

  outer: for (let step = 1; ; step++) {
    const nextPositions = new Set()

    for (const position of positions) {
      const { x, y } = deserialize(position)

      const openSpaces = directions
        .map((d) => ({ x: x + d.x, y: y + d.y }))
        .filter((p) => isOpenSpaceMemo(p.x, p.y, favoriteNumber))

      for (const openSpace of openSpaces) {
        if (openSpace.x === goal.x && openSpace.y === goal.y) {
          console.log(step)
          break outer
        }

        const serialized = serialize(openSpace.x, openSpace.y)

        if (!visited.has(serialized)) {
          nextPositions.add(serialized)
          visited.add(serialized)
        }
      }
    }

    positions = nextPositions
  }
}

export async function part2() {
  const isOpenSpaceMemo = memoize(isOpenSpace)
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ]
  const favoriteNumber = 1352

  let positions = new Set([serialize(1, 1)])
  let visited = new Set([serialize(1, 1)])

  for (let step = 1; step <= 50; step++) {
    const nextPositions = new Set()

    for (const position of positions) {
      const { x, y } = deserialize(position)

      const openSpaces = directions
        .map((d) => ({ x: x + d.x, y: y + d.y }))
        .filter((p) => isOpenSpaceMemo(p.x, p.y, favoriteNumber))

      for (const openSpace of openSpaces) {
        const serialized = serialize(openSpace.x, openSpace.y)

        if (!visited.has(serialized)) {
          nextPositions.add(serialized)
          visited.add(serialized)
        }
      }
    }

    positions = nextPositions
  }

  console.log(visited.size)
}

function isOpenSpace(x, y, favoriteNumber) {
  if (x < 0 || y < 0) return false

  let value = x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber

  let bits = 0
  while (value !== 0) {
    if (value & 1) bits++
    value >>>= 1
  }

  return bits % 2 === 0
}

function serialize(x, y) {
  return x + ',' + y
}

function deserialize(position) {
  const [x, y] = position.split(',')
  return {
    x: +x,
    y: +y,
  }
}
