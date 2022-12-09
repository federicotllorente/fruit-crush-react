import { width } from "../constants"

export const checkForColumnOfThree = (currentColorArrangement: string[]) => {
  const newCurrentColorArrangement = currentColorArrangement

  for (let i = 0; i < 47; i++) {
    const columnOfThree = [i, i + width, i + width * 2]
    const decidedColor = newCurrentColorArrangement[i]

    if (columnOfThree.every(square => newCurrentColorArrangement[square] === decidedColor))
      columnOfThree.forEach(square => newCurrentColorArrangement[square] = '')
  }

  return newCurrentColorArrangement
}

export const checkForColumnOfFour = (currentColorArrangement: string[]) => {
  const newCurrentColorArrangement = currentColorArrangement

  for (let i = 0; i < 39; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidedColor = newCurrentColorArrangement[i]

    if (columnOfFour.every(square => newCurrentColorArrangement[square] === decidedColor))
    columnOfFour.forEach(square => newCurrentColorArrangement[square] = '')
  }

  return newCurrentColorArrangement
}

export const checkForRowOfThree = (currentColorArrangement: string[]) => {
  const newCurrentColorArrangement = currentColorArrangement

  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = newCurrentColorArrangement[i]

    if (i % 8 === 6 || i % 8 === 7) continue

    if (rowOfThree.every(square => newCurrentColorArrangement[square] === decidedColor))
    rowOfThree.forEach(square => newCurrentColorArrangement[square] = '')
  }

  return newCurrentColorArrangement
}

export const checkForRowOfFour = (currentColorArrangement: string[]) => {
  const newCurrentColorArrangement = currentColorArrangement

  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = newCurrentColorArrangement[i]

    if (i % 8 === 5 || i % 8 === 6 || i % 8 === 7) continue

    if (rowOfFour.every(square => newCurrentColorArrangement[square] === decidedColor))
    rowOfFour.forEach(square => newCurrentColorArrangement[square] = '')
  }

  return newCurrentColorArrangement
}
