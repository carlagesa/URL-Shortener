import type { NextApiRequest, NextApiResponse } from "next"

const DJANGO_API_URL = process.env.REACT_APP_DJANGO_API_URL || "http://localhost:8000/api/shorten/"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { prompt } = req.body

  try {
    const response = await fetch(DJANGO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: prompt }),
    })

    if (!response.ok) {
      throw new Error("Failed to shorten URL")
    }

    const data = await response.json()
    return res.status(200).json({ text: data.short_url })
  } catch (error) {
    console.error("Error shortening URL:", error)
    return res.status(500).json({ error: "Failed to shorten URL" })
  }
}

