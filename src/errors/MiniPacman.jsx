import { useEffect, useRef, useState } from "react"
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react"

function MiniPacman({ isDark, showControls = false }) {
  const canvasRef = useRef()
  const directionHandlerRef = useRef(() => {})
  const [isMobile, setIsMobile] = useState(false)
  const [mazeIndex, setMazeIndex] = useState(0)

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

    const cellSize = isMobile ? 20 : 26

    // 🎲 10 LABIRINTOS VÁLIDOS
    const baseMaze = [
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

    function mirrorHorizontal(maze) {
      return maze.map(row => [...row].reverse())
    }

    function mirrorVertical(maze) {
      return [...maze].reverse()
    }

    function addInnerWalls(maze, seed) {
      const copy = JSON.parse(JSON.stringify(maze))
      for (let y = 2; y < 9; y++) {
        for (let x = 2; x < 17; x++) {
          if ((x * y + seed) % 7 === 0 && copy[y][x] === 0) {
            copy[y][x] = 1
          }
        }
      }
      return copy
    }

    const mazes = [
      baseMaze,
      mirrorHorizontal(baseMaze),
      mirrorVertical(baseMaze),
      mirrorHorizontal(mirrorVertical(baseMaze)),
      addInnerWalls(baseMaze, 1),
      addInnerWalls(baseMaze, 2),
      addInnerWalls(baseMaze, 3),
      addInnerWalls(mirrorHorizontal(baseMaze), 4),
      addInnerWalls(mirrorVertical(baseMaze), 5),
      addInnerWalls(mirrorHorizontal(baseMaze), 6),
      addInnerWalls(mirrorVertical(baseMaze), 7),
      addInnerWalls(baseMaze, 8),
      addInnerWalls(baseMaze, 9),
      addInnerWalls(baseMaze, 10),
      addInnerWalls(baseMaze, 11),
    ]

    const mazeTemplate = mazes[mazeIndex % mazes.length]

    const rows = mazeTemplate.length
    const cols = mazeTemplate[0].length

    canvas.width = cols * cellSize
    canvas.height = rows * cellSize

    let maze, pellets, pacman, ghost
    let gameOver = false
    let victory = false
    let tick = 0

    const resetGame = () => {
      maze = JSON.parse(JSON.stringify(mazeTemplate))
      pellets = []
      gameOver = false
      victory = false
      tick = 0

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (maze[y][x] === 0) pellets.push({ x, y })

      pacman = { x: 1, y: 1, dir: "RIGHT" }

      ghost = {
        x: cols - 2,
        y: rows - 2,
        delay: 8,
      }
    }

    resetGame()

    const changeDirection = direction => {
      if (!gameOver && !victory) pacman.dir = direction
    }
    directionHandlerRef.current = changeDirection

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
      if (ghost.delay > 0) {
        ghost.delay--
        return
      }

      if (tick % 2 !== 0) return

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
      const directions = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      }
      const direction = directions[e.key]
      if (direction) {
        e.preventDefault()
        changeDirection(direction)
      }
    }

    window.addEventListener("keydown", keyHandler)

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

      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35, y + cellSize * 0.45, 5, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65, y + cellSize * 0.45, 5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#1e3a8a"
      const dx = Math.sign(pacman.x - ghost.x) * 2
      const dy = Math.sign(pacman.y - ghost.y) * 2

      ctx.beginPath()
      ctx.arc(x + cellSize * 0.35 + dx, y + cellSize * 0.45 + dy, 2.5, 0, Math.PI * 2)
      ctx.arc(x + cellSize * 0.65 + dx, y + cellSize * 0.45 + dy, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = () => {
      ctx.fillStyle = isDark ? "#111827" : "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isDark ? "#2563eb" : "#1d4ed8"
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (maze[y][x] === 1)
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

      ctx.fillStyle = isDark ? "#ffffff" : "#334155"
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

      // 🟡 PACMAN ORIGINAL
      ctx.fillStyle = "#facc15"
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

    const loop = setInterval(() => {
      tick++
      if (!gameOver && !victory) {
        movePacman()
        moveGhost()
        checkCollisions()
      }
      draw()
    }, 250)

    return () => {
      clearInterval(loop)
      window.removeEventListener("keydown", keyHandler)
      directionHandlerRef.current = () => {}
    }
  }, [isDark, isMobile, mazeIndex])

  const controls = [
    { direction: "UP", label: "Mover para cima", Icon: IconArrowUp, position: "col-start-2 row-start-1" },
    { direction: "LEFT", label: "Mover para a esquerda", Icon: IconArrowLeft, position: "col-start-1 row-start-2" },
    { direction: "RIGHT", label: "Mover para a direita", Icon: IconArrowRight, position: "col-start-3 row-start-2" },
    { direction: "DOWN", label: "Mover para baixo", Icon: IconArrowDown, position: "col-start-2 row-start-3" },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className={`max-w-full h-auto rounded-2xl shadow-2xl ${
          isDark ? "" : "border border-gray-300"
        }`}
      />

      {showControls && (
        <div
          className="grid grid-cols-3 grid-rows-3 gap-2 touch-manipulation md:hidden"
          role="group"
          aria-label="Controles direcionais do Pac-Man"
        >
          {controls.map(({ direction, label, Icon, position }) => (
            <button
              key={direction}
              type="button"
              onClick={() => directionHandlerRef.current(direction)}
              aria-label={label}
              className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? "bg-slate-700 text-yellow-300 hover:bg-slate-600 focus:ring-yellow-400"
                  : "bg-yellow-400 text-slate-900 hover:bg-yellow-300 focus:ring-yellow-500"
              } ${position}`}
            >
              <Icon size={28} stroke={2.5} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() =>
          setMazeIndex(prev => prev + 1)
        }
        className="min-h-12 px-6 py-2 bg-yellow-400 rounded-lg font-semibold shadow-lg active:scale-95"
      >
        Novo Labirinto 🎲
      </button>
    </div>
  )
}

export default MiniPacman