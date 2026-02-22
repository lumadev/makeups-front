import { useEffect, useRef, useState } from "react"

function MiniPacman({ isDark }) {
  const canvasRef = useRef()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const cellSize = isMobile ? 18 : 24

    const mazeTemplate = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
      [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    const rows = mazeTemplate.length
    const cols = mazeTemplate[0].length

    canvas.width = cols * cellSize
    canvas.height = rows * cellSize

    let maze, pellets, pacman, ghost, gameOver, victory

    const resetGame = () => {
      maze = JSON.parse(JSON.stringify(mazeTemplate))
      pellets = []
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

    const moveGhost = () => {
      const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ]

      directions.sort((a, b) => {
        const da =
          Math.abs(pacman.x - (ghost.x + a.x)) +
          Math.abs(pacman.y - (ghost.y + a.y))
        const db =
          Math.abs(pacman.x - (ghost.x + b.x)) +
          Math.abs(pacman.y - (ghost.y + b.y))
        return da - db
      })

      for (let d of directions) {
        if (canMove(ghost.x + d.x, ghost.y + d.y)) {
          ghost.x += d.x
          ghost.y += d.y
          break
        }
      }
    }

    const checkCollisions = () => {
      pellets = pellets.filter(p => !(p.x === pacman.x && p.y === pacman.y))
      if (pellets.length === 0) victory = true
      if (ghost.x === pacman.x && ghost.y === pacman.y)
        gameOver = true
    }

    const keyHandler = e => {
      if ((gameOver || victory) && e.key.toLowerCase() === "r") {
        resetGame()
        return
      }
      if (e.key === "ArrowUp") pacman.dir = "UP"
      if (e.key === "ArrowDown") pacman.dir = "DOWN"
      if (e.key === "ArrowLeft") pacman.dir = "LEFT"
      if (e.key === "ArrowRight") pacman.dir = "RIGHT"
    }

    window.addEventListener("keydown", keyHandler)

    // 👻 Fantasma estilo clássico
    const drawGhost = () => {
      const x = ghost.x * cellSize
      const y = ghost.y * cellSize
      const r = cellSize / 2 - 2

      ctx.fillStyle = "#ff0000"

      ctx.beginPath()
      ctx.arc(x + cellSize / 2, y + r, r, Math.PI, 0)
      ctx.lineTo(x + cellSize - 2, y + cellSize - 6)

      const waveWidth = cellSize / 4
      for (let i = 0; i < 4; i++) {
        ctx.quadraticCurveTo(
          x + waveWidth * i + waveWidth / 2,
          y + cellSize,
          x + waveWidth * (i + 1),
          y + cellSize - 6
        )
      }

      ctx.closePath()
      ctx.fill()

      // olhos
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35, y + cellSize * 0.45, 5, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65, y + cellSize * 0.45, 5, 0, Math.PI * 2)
      ctx.fill()

      // pupilas
      ctx.fillStyle = "#1e3a8a"
      const dx = Math.sign(pacman.x - ghost.x) * 2
      const dy = Math.sign(pacman.y - ghost.y) * 2

      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35 + dx, y + cellSize * 0.45 + dy, 2.5, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65 + dx, y + cellSize * 0.45 + dy, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawOverlay = () => {
      if (!gameOver && !victory) return

      ctx.fillStyle = "rgba(0,0,0,0.7)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#fff"
      ctx.font = `${isMobile ? 14 : 20}px Arial`
      ctx.textAlign = "center"

      ctx.fillText(
        victory ? "VOCÊ VENCEU!" : "GAME OVER",
        canvas.width / 2,
        canvas.height / 2 - 10
      )

      ctx.fillText(
        "Pressione R para reiniciar",
        canvas.width / 2,
        canvas.height / 2 + 20
      )
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
      drawOverlay()
    }

    const loop = setInterval(() => {
      if (!gameOver && !victory) {
        movePacman()
        moveGhost()
        checkCollisions()
      }
      draw()
    }, 200)

    return () => {
      clearInterval(loop)
      window.removeEventListener("keydown", keyHandler)
    }
  }, [isDark, isMobile])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} className="rounded-2xl shadow-2xl" />

      {isMobile && (
        <div className="grid grid-cols-3 gap-2 text-xl select-none">
          <div></div>
          <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowUp"}))}>⬆️</button>
          <div></div>
          <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowLeft"}))}>⬅️</button>
          <div></div>
          <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowRight"}))}>➡️</button>
          <div></div>
          <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowDown"}))}>⬇️</button>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default MiniPacman