import { width } from "../constants"

export const checkForColumnOfThree = (
  currentColorArrangement: string[],
  setScore?: React.Dispatch<React.SetStateAction<number>>
): {
  newCurrentColorArrangement: string[]
  wasUpdated: boolean
} => {
  const newCurrentColorArrangement = currentColorArrangement
  let wasUpdated = false

  for (let i = 0; i < 48; i++) {
    const columnOfThree = [i, i + width, i + width * 2]
    const decidedColor = newCurrentColorArrangement[i]

    if (columnOfThree.every(square => newCurrentColorArrangement[square] === decidedColor)) {
      setScore && setScore(v => v + 3)
      columnOfThree.forEach(square => newCurrentColorArrangement[square] = '')
      wasUpdated = true
    }
  }

  return {
    newCurrentColorArrangement,
    wasUpdated
  }
}

export const checkForColumnOfFour = (
  currentColorArrangement: string[],
  setScore?: React.Dispatch<React.SetStateAction<number>>
): {
  newCurrentColorArrangement: string[]
  wasUpdated: boolean
} => {
  const newCurrentColorArrangement = currentColorArrangement
  let wasUpdated = false

  for (let i = 0; i < 40; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidedColor = newCurrentColorArrangement[i]

    if (columnOfFour.every(square => newCurrentColorArrangement[square] === decidedColor)) {
      setScore && setScore(v => v + 4)
      columnOfFour.forEach(square => newCurrentColorArrangement[square] = '')
      wasUpdated = true
    }
  }

  return {
    newCurrentColorArrangement,
    wasUpdated
  }
}

export const checkForRowOfThree = (
  currentColorArrangement: string[],
  setScore?: React.Dispatch<React.SetStateAction<number>>
): {
  newCurrentColorArrangement: string[]
  wasUpdated: boolean
} => {
  const newCurrentColorArrangement = currentColorArrangement
  let wasUpdated = false

  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = newCurrentColorArrangement[i]

    if (i % 8 === 6 || i % 8 === 7) continue

    if (rowOfThree.every(square => newCurrentColorArrangement[square] === decidedColor)) {
      setScore && setScore(v => v + 3)
      rowOfThree.forEach(square => newCurrentColorArrangement[square] = '')
      wasUpdated = true
    }
  }

  return {
    newCurrentColorArrangement,
    wasUpdated
  }
}

export const checkForRowOfFour = (
  currentColorArrangement: string[],
  setScore?: React.Dispatch<React.SetStateAction<number>>
): {
  newCurrentColorArrangement: string[]
  wasUpdated: boolean
} => {
  const newCurrentColorArrangement = currentColorArrangement
  let wasUpdated = false

  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = newCurrentColorArrangement[i]

    if (i % 8 === 5 || i % 8 === 6 || i % 8 === 7) continue

    if (rowOfFour.every(square => newCurrentColorArrangement[square] === decidedColor)) {
      setScore && setScore(v => v + 4)
      rowOfFour.forEach(square => newCurrentColorArrangement[square] = '')
      wasUpdated = true
    }
  }

  return {
    newCurrentColorArrangement,
    wasUpdated
  }
}
