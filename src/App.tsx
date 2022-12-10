import { DragEvent, useCallback, useEffect, useState } from "react"
import { candyColors } from "./constants";
import {
  createBoard,
  checkForColumnOfFour,
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  moveIntoSquareBelow,
  wasMovedOnlyOnePosition,
  getFruitData
} from "./helpers"

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLSpanElement | null>(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLSpanElement | null>(null)

  useEffect(() => {
    setCurrentColorArrangement(createBoard())
  }, [])

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

  const handleDragStart = useCallback((e: DragEvent<HTMLSpanElement>) => {
    setSquareBeingDragged(e.target as HTMLSpanElement)
  }, [])

  const handleDrop = useCallback((e: DragEvent<HTMLSpanElement>) => {
    setSquareBeingReplaced(e.target as HTMLSpanElement)
  }, [])

  const handleDragEnd = useCallback(() => {
    const newCurrentColorArrangement = currentColorArrangement

    const squareBeingDraggedId = parseInt(squareBeingDragged?.getAttribute('data-id') ?? '')
    const squareBeingReplacedId = parseInt(squareBeingReplaced?.getAttribute('data-id') ?? '')
    
    newCurrentColorArrangement[squareBeingReplacedId] = squareBeingDragged?.getAttribute('data-color') ?? ''
    newCurrentColorArrangement[squareBeingDraggedId] = squareBeingReplaced?.getAttribute('data-color') ?? ''

    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForColumnOfFour,
      wasUpdated: wasUpdatedAfterCheckingForColumnOfFour
    } = checkForColumnOfFour([...newCurrentColorArrangement])
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfFour,
      wasUpdated: wasUpdatedAfterCheckingForRowOfFour
    } = checkForRowOfFour([...colorArrangementAfterCheckingForColumnOfFour])
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForColumnOfThree,
      wasUpdated: wasUpdatedAfterCheckingForColumnOfThree
    } = checkForColumnOfThree([...colorArrangementAfterCheckingForRowOfFour])
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfThree,
      wasUpdated: wasUpdatedAfterCheckingForRowOfThree
    } = checkForRowOfThree([...colorArrangementAfterCheckingForColumnOfThree])

    const wasUpdated = wasUpdatedAfterCheckingForColumnOfFour || wasUpdatedAfterCheckingForRowOfFour || wasUpdatedAfterCheckingForColumnOfThree || wasUpdatedAfterCheckingForRowOfThree

    if (squareBeingReplacedId && wasMovedOnlyOnePosition(squareBeingDraggedId, squareBeingReplacedId) && wasUpdated) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      colorArrangementAfterCheckingForRowOfThree[squareBeingReplacedId] = squareBeingReplaced?.getAttribute('data-color') ?? ''
      colorArrangementAfterCheckingForRowOfThree[squareBeingDraggedId] = squareBeingDragged?.getAttribute('data-color') ?? ''
    }
    
    setCurrentColorArrangement([...colorArrangementAfterCheckingForRowOfThree])
  }, [currentColorArrangement, squareBeingDragged, squareBeingReplaced])

  return (
    <main className="game-app">
      <div className="game-board">
        {currentColorArrangement.map((el, idx) => {
          const fruitData = getFruitData(el as candyColors)
          return (
            <span
              key={idx}
              data-id={idx}
              data-color={el}
              // style={{ backgroundColor: el }}
              draggable
              onDragStart={handleDragStart}
              onDragOver={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
              onDragEnter={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
              onDragLeave={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            >
              {fruitData.imageSrc && (
                <img
                  src={fruitData.imageSrc}
                  alt={fruitData.imageAlt}
                  width={50}
                  // height={50}
                />
              )}
            </span>
          )
        })}
      </div>
    </main>
  )
}

export default App
