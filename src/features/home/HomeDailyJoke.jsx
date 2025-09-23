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
      <div className="w-full p-4 bg-gray-100 rounded-lg animate-pulse">
        Carregando piada do dia...
      </div>
    )
  }

  if (!dailyJoke) {
    return null
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Piada do dia</h2>
      <p className="text-gray-700">{dailyJoke.description}</p>
    </div>
  )
}
