import { width } from "../constants"

export const wasMovedOnlyOnePosition = (initialPosition: number, finalPosition: number): boolean => {
  if (!initialPosition || !finalPosition) return false
  const positionDifference = initialPosition - finalPosition

  switch (positionDifference) {
    case -width:
      return true
    case width:
        return true
    case -1:
      return true
    case 1:
        return true
    default:
      return false
  }
}
