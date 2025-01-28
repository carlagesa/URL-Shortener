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
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "2rem",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="url"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Long URL
          </label>
          <input
            id="url"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter your long URL"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: "#4299e1",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {shortUrl && (
        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Shortened URL:</h3>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4299e1", wordBreak: "break-all" }}
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default URLShortener

