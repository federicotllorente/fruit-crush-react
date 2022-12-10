import { DragEvent } from "react"
import { candyColors } from "../constants";
import { getFruitData } from "../helpers"

type BoardElementProps = {
  color: candyColors,
  handleDragStart: (e: DragEvent<HTMLSpanElement>) => void,
  handleDrop: (e: DragEvent<HTMLSpanElement>) => void,
  handleDragEnd: (e: DragEvent<HTMLSpanElement>) => void
}

export const BoardElement = ({
  color,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  ...props
}: BoardElementProps) => {
  const fruitData = getFruitData(color)

  return (
    <span
      data-color={color}
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
      onDragEnter={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
      onDragLeave={(e: DragEvent<HTMLSpanElement>) => e.preventDefault()}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      {...props}
    >
      {fruitData.imageSrc && (
        <img
          draggable={false}
          src={fruitData.imageSrc}
          alt={fruitData.imageAlt}
          width={50}
        />
      )}
    </span>
  )
}
