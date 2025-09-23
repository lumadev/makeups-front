// SpotifySongsSkeleton.jsx
import React from "react"

function SpotifySongsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
        >
          {/* Imagem */}
          <div className="w-16 h-16 bg-gray-300 rounded-md" />

          {/* Texto */}
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-4 bg-gray-300 rounded" />
            <div className="w-1/2 h-4 bg-gray-300 rounded" />
            <div className="w-1/3 h-4 bg-gray-200 rounded" />
          </div>

          {/* Botão */}
          <div className="w-20 h-8 bg-gray-300 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default SpotifySongsSkeleton
