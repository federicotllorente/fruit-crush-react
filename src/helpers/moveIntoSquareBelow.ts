import { candyColorsArray as candyColors, width } from "../constants"

export const moveIntoSquareBelow = (currentColorArrangement: string[]) => {
  const newCurrentColorArrangement = currentColorArrangement

  for (let i = 0; i < 56; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]

    if (firstRow.includes(i) && newCurrentColorArrangement[i] === '') {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      newCurrentColorArrangement[i] = randomColor
    }

    if (newCurrentColorArrangement[i + width] === '') {
      newCurrentColorArrangement[i + width] = newCurrentColorArrangement[i]
      newCurrentColorArrangement[i] = ''
    }
  }

  return newCurrentColorArrangement
}
