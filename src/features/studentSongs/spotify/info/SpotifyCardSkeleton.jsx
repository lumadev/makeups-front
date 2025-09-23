function SpotifyCardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-2xl shadow-lg animate-pulse">
      <div className="flex items-center justify-center">
        <div className="w-48 h-48 bg-gray-300 rounded-xl" />
      </div>

      <div className="col-span-2 flex flex-col justify-center space-y-3">
        <div className="h-7 bg-gray-300 rounded w-2/3" />
        <div className="h-5 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />

        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>

        <div className="mt-5 h-9 w-32 bg-gray-300 rounded-lg" />
      </div>
    </div>
  )
}

export default SpotifyCardSkeleton