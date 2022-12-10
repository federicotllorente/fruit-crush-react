import { candyColorsArray as candyColors, width } from "../constants"

export const createBoard = (): string[] => {
  const randomColorArrangement = []

  for (let i = 0; i < width * width; i++) {
    const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
    randomColorArrangement.push(randomColor)
  }

  return randomColorArrangement
}
