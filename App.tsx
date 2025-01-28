import React from "react"
import URLShortener from "./components/URLShortener"

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        URL Shortener
      </h1>
      <URLShortener />
    </div>
  )
}

export default App

