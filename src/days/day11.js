export async function part1() {
  let previousStates = new Set()
  const seen = new Set()
  let state = State.fromString('0-TmG,TmM,PuG,SrG;PuM,SrM;PmG,PmM,RuG,RuM;')
  previousStates.add(state.toString())
  seen.add(state.toString())

  outer: for (let step = 1; step < 100; step++) {
    console.log(`Step ${step}, processing ${previousStates.size} states`)
    const nextStates = new Set()

    for (const previousState of previousStates) {
      const state = State.fromString(previousState)
      for (const nextState of state.possibleMoves()) {
        if (nextState.isSolution()) {
          console.log(`Found solution at step ${step}`)
          break outer
        }
        const key = nextState.toString()
        if (!seen.has(key)) {
          nextStates.add(key)
          seen.add(key)
        }
      }
    }

    previousStates = nextStates
  }
}

export async function part2() {
  let previousStates = new Set()
  const seen = new Set()
  let state = State.fromString('0-EG,EM,DG,DM,TmG,TmM,PuG,SrG;PuM,SrM;PmG,PmM,RuG,RuM;')
  previousStates.add(state.toString())
  seen.add(state.toString())

  outer: for (let step = 1; step < 100; step++) {
    console.log(`Step ${step}, processing ${previousStates.size} states`)
    const nextStates = new Set()

    for (const previousState of previousStates) {
      const state = State.fromString(previousState)
      for (const nextState of state.possibleMoves()) {
        if (nextState.isSolution()) {
          console.log(`Found solution at step ${step}`)
          break outer
        }
        const key = nextState.toString()
        if (!seen.has(key)) {
          nextStates.add(key)
          seen.add(key)
        }
      }
    }

    previousStates = nextStates
  }
}

class State {
  constructor() {
    this.elevator = 0
    this.floors = [[], [], [], []]
  }

  possibleMoves() {
    const moves = []
    const candidates = this.getCandidates()

    if (this.elevator < 3) {
      for (const candidate of candidates) {
        if (State.isLegalFloor([...this.floors[this.elevator + 1], ...candidate])) {
          const move = this.clone()
          move.floors[this.elevator + 1] = [...this.floors[this.elevator + 1], ...candidate]
          move.floors[this.elevator] = this.floors[this.elevator].filter((item) => !candidate.includes(item))
          move.elevator = this.elevator + 1
          moves.push(move)
        }
      }
    }

    if (this.elevator > 0) {
      for (const candidate of candidates) {
        if (State.isLegalFloor([...this.floors[this.elevator - 1], ...candidate])) {
          const move = this.clone()
          move.floors[this.elevator - 1] = [...this.floors[this.elevator - 1], ...candidate]
          move.floors[this.elevator] = this.floors[this.elevator].filter((item) => !candidate.includes(item))
          move.elevator = this.elevator - 1
          moves.push(move)
        }
      }
    }

    return moves
  }

  isSolution() {
    return this.floors[0].length === 0 && this.floors[1].length === 0 && this.floors[2].length === 0
  }

  getCandidates() {
    const result = []
    const currentFloor = this.floors[this.elevator]

    for (let i = 0; i < currentFloor.length; i++) {
      if (State.isLegalFloor(currentFloor.filter((_, index) => i !== index))) {
        result.push([currentFloor[i]])
      }
    }

    for (let i = 0; i < currentFloor.length - 1; i++) {
      for (let j = i + 1; j < currentFloor.length; j++) {
        if (State.isLegalFloor(currentFloor.filter((_, index) => i !== index && j !== index))) {
          result.push([currentFloor[i], currentFloor[j]])
        }
      }
    }

    return result
  }

  static isLegalFloor(floor) {
    const generators = floor.filter((item) => item.endsWith('G')).map(State.element)

    if (!generators.length > 0) return true

    return floor
      .filter((item) => item.endsWith('M'))
      .every((microchip) => generators.includes(State.element(microchip)))
  }

  static element(item) {
    return item.substring(0, item.length - 1)
  }

  static fromString(value) {
    const result = new State()

    const [elevator, floors] = value.split('-')
    result.elevator = +elevator
    result.floors = floors.split(';').map((floor) => (floor === '' ? [] : floor.split(',')))

    return result
  }

  toString() {
    const floor = (i) => this.floors[i].sort().join(',')
    return `${this.elevator}-${floor(0)};${floor(1)};${floor(2)};${floor(3)}`
  }

  clone() {
    const result = new State()

    result.elevator = this.elevator
    result.floors = this.floors.map((floor) => [...floor])

    return result
  }
}
