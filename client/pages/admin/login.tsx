"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLogin() {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const router = useRouter()

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault()
  // Qui dovresti implementare la logica di autenticazione reale
  // Questo è solo un esempio e non dovrebbe essere usato in produzione
  if (username === "admin" && password === "password") {
    router.push("/admin/dashboard")
  } else {
    alert("Credenziali non valide")
  }
}

return (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <Card className="w-[350px] bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#FF7F27]">Accesso Amministratore</CardTitle>
        <CardDescription className="text-white">Accedi alla dashboard di TaxiRentNcc</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Inserisci il tuo username"
              className="bg-zinc-800 text-white border-zinc-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Inserisci la tua password"
                className="bg-zinc-800 text-white border-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90">
            Accedi
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
)
}
