import { type NextRequest, NextResponse } from "next/server"

const DJANGO_API_URL = process.env.DJANGO_API_URL || "http://localhost:8000/api/shorten/"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

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
    return NextResponse.json({ text: data.short_url })
  } catch (error) {
    console.error("Error shortening URL:", error)
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 })
  }
}

