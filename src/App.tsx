import { useEffect, useState } from "react"
import { BoardElement } from "./components"
import { candyColors } from "./constants"
import {
  createBoard,
  checkForColumnOfFour,
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  moveIntoSquareBelow,
  useDragElement} from "./helpers"

const App = () => {
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(false)
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    setCurrentColorArrangement(createBoard())
  }, [gameHasStarted])

  useEffect(() => {
    const timer = setInterval(() => {
      const {
        newCurrentColorArrangement: colorArrangementAfterCheckingForColumnOfFour
      } = checkForColumnOfFour([...currentColorArrangement])
      
      const {
        newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfFour
      } = checkForRowOfFour([...colorArrangementAfterCheckingForColumnOfFour])
      
      const {
        newCurrentColorArrangement: colorArrangementAfterCheckingForColumnOfThree
      } = checkForColumnOfThree([...colorArrangementAfterCheckingForRowOfFour])
      
      const {
        newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfThree
      } = checkForRowOfThree([...colorArrangementAfterCheckingForColumnOfThree])
      
      const colorArrangementAfterMovingIntoSquareBelow =
        moveIntoSquareBelow([...colorArrangementAfterCheckingForRowOfThree])

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

  const {
    handleDragStart,
    handleDrop,
    handleDragEnd
  } = useDragElement(currentColorArrangement, setCurrentColorArrangement, setScore)

  return (
    <main className="game-app">
      {gameHasStarted ? (
        <>
          <h1>Score: {score}</h1>
          <div className="game-board">
            {currentColorArrangement.map((color, idx) => (
              <BoardElement
                color={color as candyColors}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragEnd={handleDragEnd}
                key={idx}
                data-id={idx}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setGameHasStarted(false)
              setScore(0)
            }}
          >
            Finish game
          </button>
        </>
      ) : (
        <div className="game-initialScreen">
          <h1>Welcome to Fruit Crash!</h1>
          <h3>Wanna play?</h3>
          <button
            onClick={() => setGameHasStarted(true)}
          >
            Start game
          </button>
        </div>
      )}
    </main>
  )
}

export default App
