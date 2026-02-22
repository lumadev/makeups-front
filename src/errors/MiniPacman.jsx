import { useEffect, useRef } from "react"

function MiniPacman({ isDark }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const cellSize = 24

    const mazeTemplate = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
      [0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0],
      [1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    let maze, pellets, pacman, ghost, score, gameOver, victory
    const rows = mazeTemplate.length
    const cols = mazeTemplate[0].length

    const resetGame = () => {
      maze = JSON.parse(JSON.stringify(mazeTemplate))
      pellets = []
      score = 0
      gameOver = false
      victory = false

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (maze[y][x] === 0) pellets.push({ x, y })

      pacman = { x: 1, y: 1, dir: "RIGHT" }
      ghost = { x: cols - 2, y: rows - 2 }
    }

    resetGame()

    const canMove = (x, y) =>
      y >= 0 && y < rows && x >= 0 && x < cols && maze[y][x] === 0

    const movePacman = () => {
      const dirs = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
      }

      const nextX = pacman.x + dirs[pacman.dir].x
      const nextY = pacman.y + dirs[pacman.dir].y

      if (canMove(nextX, nextY)) {
        pacman.x = nextX
        pacman.y = nextY
      }
    }

    // BFS Pathfinding
    const findPath = (start, target) => {
      const queue = [[start]]
      const visited = new Set()
      visited.add(`${start.x},${start.y}`)

      while (queue.length) {
        const path = queue.shift()
        const { x, y } = path[path.length - 1]

        if (x === target.x && y === target.y) return path

        const neighbors = [
          { x: x + 1, y },
          { x: x - 1, y },
          { x, y: y + 1 },
          { x, y: y - 1 },
        ]

        for (let n of neighbors) {
          const key = `${n.x},${n.y}`
          if (canMove(n.x, n.y) && !visited.has(key)) {
            visited.add(key)
            queue.push([...path, n])
          }
        }
      }
      return null
    }

    const moveGhost = () => {
      const path = findPath(ghost, pacman)
      if (path && path.length > 1) {
        ghost.x = path[1].x
        ghost.y = path[1].y
      }
    }

    const checkCollisions = () => {
      pellets = pellets.filter(p => {
        if (p.x === pacman.x && p.y === pacman.y) {
          score += 10
          return false
        }
        return true
      })

      if (pellets.length === 0) victory = true
      if (ghost.x === pacman.x && ghost.y === pacman.y)
        gameOver = true
    }

    const keyHandler = e => {
      if ((gameOver || victory) && e.key.toLowerCase() === "r") {
        resetGame()
        return
      }

      if (!gameOver && !victory) {
        if (e.key === "ArrowUp") pacman.dir = "UP"
        if (e.key === "ArrowDown") pacman.dir = "DOWN"
        if (e.key === "ArrowLeft") pacman.dir = "LEFT"
        if (e.key === "ArrowRight") pacman.dir = "RIGHT"
      }
    }

    window.addEventListener("keydown", keyHandler)

    const drawGhost = () => {
      const x = ghost.x * cellSize
      const y = ghost.y * cellSize
      const r = cellSize / 2 - 2

      ctx.fillStyle = "#ef4444"

      // cabeça
      ctx.beginPath()
      ctx.arc(x + cellSize / 2, y + r, r, Math.PI, 0)
      ctx.lineTo(x + cellSize - 2, y + cellSize - 2)

      // base ondulada
      const waveWidth = cellSize / 4
      for (let i = 0; i < 4; i++) {
        ctx.quadraticCurveTo(
          x + waveWidth * i + waveWidth / 2,
          y + cellSize - 6,
          x + waveWidth * (i + 1),
          y + cellSize - 2
        )
      }

      ctx.closePath()
      ctx.fill()

      // olhos
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35, y + cellSize * 0.5, 4, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65, y + cellSize * 0.5, 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35, y + cellSize * 0.5, 2, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65, y + cellSize * 0.5, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = () => {
      ctx.fillStyle = isDark ? "#111827" : "#f1f5f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#2563eb"
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (maze[y][x] === 1)
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

      ctx.fillStyle = "#fff"
      pellets.forEach(p => {
        ctx.beginPath()
        ctx.arc(
          p.x * cellSize + cellSize / 2,
          p.y * cellSize + cellSize / 2,
          3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })

      // Pacman
      ctx.fillStyle = "yellow"
      ctx.beginPath()
      ctx.arc(
        pacman.x * cellSize + cellSize / 2,
        pacman.y * cellSize + cellSize / 2,
        cellSize / 2 - 2,
        0.2,
        Math.PI * 2 - 0.2
      )
      ctx.lineTo(
        pacman.x * cellSize + cellSize / 2,
        pacman.y * cellSize + cellSize / 2
      )
      ctx.fill()

      drawGhost()
    }

    // ⏳ MAIS LENTO AQUI
    const loop = setInterval(() => {
      if (!gameOver && !victory) {
        movePacman()
        moveGhost()
        checkCollisions()
      }
      draw()
    }, 180) // antes era 120

    return () => {
      clearInterval(loop)
      window.removeEventListener("keydown", keyHandler)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      width={456}
      height={264}
      className="rounded-2xl shadow-2xl"
    />
  )
}

export default MiniPacman