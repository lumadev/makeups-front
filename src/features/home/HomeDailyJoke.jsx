import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getAllJokes } from "@/features/jokes/jokeService"
import { getRandomJoke } from "@/features/jokes/jokeUtils"

export default function HomeDailyJoke({ onCountChange }) {
  const [loading, setLoading] = useState(true)
  const [dailyJoke, setDailyJoke] = useState(null)

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await getAllJokes()
        const joke = getRandomJoke(res.data)

        setDailyJoke(joke)
      } catch {
        toast("Ocorreu um erro ao buscar as piadas", { type: "error" })
      } finally {
        setLoading(false)
      }
    }

    fetchJokes()
  }, [onCountChange])

  if (loading) {
    return (
      <div className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse mb-6">
        Carregando piada do dia...
      </div>
    )
  }

  if (!dailyJoke) {
    return null
  }

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md 
      dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Piada do dia
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {dailyJoke.description}
      </p>
    </div>
  )
}