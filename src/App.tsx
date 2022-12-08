import { useEffect, useState } from "react"
import { createBoard } from "./helpers"

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([])

  useEffect(() => {
    setCurrentColorArrangement(createBoard())
  }, [])

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
