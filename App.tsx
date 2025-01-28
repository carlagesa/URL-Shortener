import React from "react"
import URLShortener from "./components/URLShortener"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">URL Shortener</h1>
      <URLShortener />
    </div>
  )
}

export default App

