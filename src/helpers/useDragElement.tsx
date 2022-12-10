import { DragEvent, useCallback, useState } from "react"
import {
  checkForColumnOfFour,
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  wasMovedOnlyOnePosition,
} from "../helpers"

export const useDragElement = (
  currentColorArrangement: string[],
  setCurrentColorArrangement: React.Dispatch<React.SetStateAction<string[]>>,
  setScore: React.Dispatch<React.SetStateAction<number>>
): {
  handleDragStart: (e: DragEvent<HTMLSpanElement>) => void,
  handleDrop: (e: DragEvent<HTMLSpanElement>) => void,
  handleDragEnd: (e: DragEvent<HTMLSpanElement>) => void
} => {
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLSpanElement | null>(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLSpanElement | null>(null)

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
    } = checkForColumnOfFour([...newCurrentColorArrangement], setScore)
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfFour,
      wasUpdated: wasUpdatedAfterCheckingForRowOfFour
    } = checkForRowOfFour([...colorArrangementAfterCheckingForColumnOfFour], setScore)
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForColumnOfThree,
      wasUpdated: wasUpdatedAfterCheckingForColumnOfThree
    } = checkForColumnOfThree([...colorArrangementAfterCheckingForRowOfFour], setScore)
    
    const {
      newCurrentColorArrangement: colorArrangementAfterCheckingForRowOfThree,
      wasUpdated: wasUpdatedAfterCheckingForRowOfThree
    } = checkForRowOfThree([...colorArrangementAfterCheckingForColumnOfThree], setScore)

    const wasUpdated = wasUpdatedAfterCheckingForColumnOfFour || wasUpdatedAfterCheckingForRowOfFour || wasUpdatedAfterCheckingForColumnOfThree || wasUpdatedAfterCheckingForRowOfThree

    if (squareBeingReplacedId && wasMovedOnlyOnePosition(squareBeingDraggedId, squareBeingReplacedId) && wasUpdated) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      colorArrangementAfterCheckingForRowOfThree[squareBeingReplacedId] = squareBeingReplaced?.getAttribute('data-color') ?? ''
      colorArrangementAfterCheckingForRowOfThree[squareBeingDraggedId] = squareBeingDragged?.getAttribute('data-color') ?? ''
    }
    
    setCurrentColorArrangement([...colorArrangementAfterCheckingForRowOfThree])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColorArrangement, squareBeingDragged, squareBeingReplaced])

  return {
    handleDragStart,
    handleDrop,
    handleDragEnd
  }
}
