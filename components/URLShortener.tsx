import type React from "react"
import { useState } from "react"

const URLShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setShortUrl("")

    try {
      const response = await fetch("http://localhost:8000/api/shorten/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to shorten URL")
      }

      const data = await response.json()
      setShortUrl(data.short_url)
    } catch (err) {
      setError("An error occurred while shortening the URL")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
            Long URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="url"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {shortUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Shortened URL:</h3>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default URLShortener

