import { useEffect, useState } from "react"
import {
  createBoard,
  checkForColumnOfFour,
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  moveIntoSquareBelow
} from "./helpers"

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([])

  useEffect(() => {
    setCurrentColorArrangement(createBoard())
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const colorArrangementAfterCheckingForColumnOfFour = checkForColumnOfFour([...currentColorArrangement])
      const colorArrangementAfterCheckingForRowOfFour = checkForRowOfFour([...colorArrangementAfterCheckingForColumnOfFour])
      const colorArrangementAfterCheckingForColumnOfThree = checkForColumnOfThree([...colorArrangementAfterCheckingForRowOfFour])
      const colorArrangementAfterCheckingForRowOfThree = checkForRowOfThree([...colorArrangementAfterCheckingForColumnOfThree])
      const colorArrangementAfterMovingIntoSquareBelow = moveIntoSquareBelow([...colorArrangementAfterCheckingForRowOfThree])

      setCurrentColorArrangement([...colorArrangementAfterMovingIntoSquareBelow])
    }, 1000)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement
  ])

  console.log(currentColorArrangement)

  return (
    <main className="game-app">
      <div className="game-board">
        {currentColorArrangement.map((el, idx) => (
          <span
            key={idx}
            style={{ backgroundColor: el }}
          >{idx}</span>
        ))}
      </div>
    </main>
  )
}

export default App

// -8 => Top
// +8 => Bottom
// -1 => Left
// +1 => Right

// -9 => Top Left
// -7 => Top Right
// +7 => Bottom Left
// +9 => Bottom Right
