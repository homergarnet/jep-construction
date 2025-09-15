import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useRef, useState } from 'react'

interface AttendanceRow {
  location: string
  timeIn: string
  timeOut?: string
  timeInImage: string
  timeOutImage?: string
}


const InOut = () => {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [records, setRecords] = useState<AttendanceRow[]>([])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const camStream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(camStream)
        if (videoRef.current) {
          videoRef.current.srcObject = camStream
          videoRef.current.play()
        }
      } catch (err) {
        console.error("Camera error:", err)
      }
    }

    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  // reverse geocode
  const fetchCityCountry = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
      const data = await res.json()
      const city =
        data.address.city || data.address.town || data.address.village || data.address.state
      const country = data.address.country
      setLocation(`${city}, ${country}`)
      return `${city}, ${country}`
    } catch {
      return `Lat: ${lat}, Lng: ${lng}`
    }
  }

  // take snapshot from video
  const captureImage = (): string => {
    if (!videoRef.current || !canvasRef.current) return ""
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL("image/png")
  }

  const handleTimeIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords
        const loc = await fetchCityCountry(latitude, longitude)
        const img = captureImage()
        setRecords((prev) => [
          ...prev,
          {
            location: loc,
            timeIn: new Date().toLocaleTimeString(),
            timeInImage: img,
          },
        ])
      })
    }
  }

  const handleTimeOut = () => {
    const img = captureImage()
    setRecords((prev) => {
      if (prev.length === 0) return prev
      const updated = [...prev]
      updated[updated.length - 1].timeOut = new Date().toLocaleTimeString()
      updated[updated.length - 1].timeOutImage = img
      return updated
    })
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* clock */}
      <div className="text-2xl font-bold">{currentTime}</div>

      {/* buttons */}
      <div className="flex gap-4">
        <Button onClick={handleTimeIn}>Time In</Button>
        <Button variant="destructive" onClick={handleTimeOut}>
          Time Out
        </Button>
      </div>

      {/* live camera */}
      {stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="mt-4 w-64 rounded-lg shadow"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {/* table */}
      {records.length > 0 && (
        <table className="mt-6 w-full max-w-4xl border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Time In</th>
              <th className="border px-2 py-1">Image In</th>
              <th className="border px-2 py-1">Time Out</th>
              <th className="border px-2 py-1">Image Out</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{r.location}</td>
                <td className="border px-2 py-1">{r.timeIn}</td>
                <td className="border px-2 py-1">
                  <img src={r.timeInImage} alt="In" className="w-20 rounded" />
                </td>
                <td className="border px-2 py-1">{r.timeOut || "-"}</td>
                <td className="border px-2 py-1">
                  {r.timeOutImage ? (
                    <img src={r.timeOutImage} alt="Out" className="w-20 rounded" />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default InOut
