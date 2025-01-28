import type React from "react"
import { useState } from "react"
import { useCompletion } from "ai/react"
import "./App.css"

function App() {
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { complete, isLoading } = useCompletion({
    api: "/shorten",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const longUrl = (form.elements.namedItem("longUrl") as HTMLInputElement).value

    if (!longUrl) {
      setError("Please enter a URL")
      return
    }

    try {
      const result = await complete(longUrl)
      setShortUrl(result)
      setError(null)
    } catch (err) {
      setError("An error occurred while shortening the URL")
      setShortUrl(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700">
              Enter your long URL
            </label>
            <input
              type="url"
              id="longUrl"
              name="longUrl"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/very/long/url"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

