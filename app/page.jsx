"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// TODO
const Homepage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/admin/login")
  }, [])
  return (
    <div>Homepage</div>
  )
}

export default Homepage