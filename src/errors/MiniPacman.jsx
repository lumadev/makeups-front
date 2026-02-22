import { useEffect, useRef } from "react"

function MiniPacman({ isDark }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const cellSize = 30
    const rows = 15
    const cols = 15

    // Labirinto simples
    const maze = Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) =>
        x === 0 || y === 0 || x === cols - 1 || y === rows - 1 ? 1 : 0
      )
    )

    let score = 0

    // Bolinhas
    let pellets = []
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        pellets.push({ x, y })
      }
    }

    let pacman = {
      x: 1,
      y: 1,
      dir: "RIGHT",
      mouth: 0
    }

    let ghost = {
      x: cols - 2,
      y: rows - 2,
      dir: "LEFT"
    }

    const drawMaze = () => {
      ctx.fillStyle = isDark ? "#111" : "#f1f5f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isDark ? "#1e293b" : "#cbd5e1"
      maze.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          }
        })
      })
    }

    const drawPellets = () => {
      ctx.fillStyle = "#fff"
      pellets.forEach(p => {
        ctx.beginPath()
        ctx.arc(
          p.x * cellSize + cellSize / 2,
          p.y * cellSize + cellSize / 2,
          4,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })
    }

    const drawPacman = () => {
      const px = pacman.x * cellSize + cellSize / 2
      const py = pacman.y * cellSize + cellSize / 2

      pacman.mouth += 0.2
      const open = Math.abs(Math.sin(pacman.mouth)) * 0.5

      ctx.fillStyle = "yellow"
      ctx.beginPath()
      ctx.arc(px, py, cellSize / 2 - 2, open, Math.PI * 2 - open)
      ctx.lineTo(px, py)
      ctx.fill()
    }

    const drawGhost = () => {
      const gx = ghost.x * cellSize + cellSize / 2
      const gy = ghost.y * cellSize + cellSize / 2

      ctx.fillStyle = "red"
      ctx.beginPath()
      ctx.arc(gx, gy, cellSize / 2 - 2, Math.PI, 0)
      ctx.lineTo(gx + cellSize / 2 - 2, gy + cellSize / 2 - 2)
      ctx.lineTo(gx - cellSize / 2 + 2, gy + cellSize / 2 - 2)
      ctx.closePath()
      ctx.fill()
    }

    const drawScore = () => {
      ctx.fillStyle = isDark ? "#fff" : "#000"
      ctx.font = "16px Arial"
      ctx.fillText("Score: " + score, 10, canvas.height - 10)
    }

    const move = (entity) => {
      const dirs = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 }
      }

      const nextX = entity.x + dirs[entity.dir].x
      const nextY = entity.y + dirs[entity.dir].y

      if (maze[nextY][nextX] === 0) {
        entity.x = nextX
        entity.y = nextY
      }
    }

    const randomGhostMove = () => {
      const directions = ["UP", "DOWN", "LEFT", "RIGHT"]
      ghost.dir = directions[Math.floor(Math.random() * 4)]
    }

    const checkPelletCollision = () => {
      pellets = pellets.filter(p => {
        if (p.x === pacman.x && p.y === pacman.y) {
          score += 10
          return false
        }
        return true
      })
    }

    const checkGhostCollision = () => {
      if (ghost.x === pacman.x && ghost.y === pacman.y) {
        alert("Game Over! Score: " + score)
        window.location.reload()
      }
    }

    const keyHandler = (e) => {
      if (e.key === "ArrowUp") pacman.dir = "UP"
      if (e.key === "ArrowDown") pacman.dir = "DOWN"
      if (e.key === "ArrowLeft") pacman.dir = "LEFT"
      if (e.key === "ArrowRight") pacman.dir = "RIGHT"
    }

    window.addEventListener("keydown", keyHandler)

    const gameLoop = setInterval(() => {
      move(pacman)
      if (Math.random() < 0.3) randomGhostMove()
      move(ghost)

      checkPelletCollision()
      checkGhostCollision()

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMaze()
      drawPellets()
      drawPacman()
      drawGhost()
      drawScore()
    }, 200)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener("keydown", keyHandler)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      width={450}
      height={450}
      className="rounded-xl shadow-2xl"
    />
  )
}

export default MiniPacman