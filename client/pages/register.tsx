import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem('token', token)
        router.push('/abbonamenti')
      } else {
        const data = await response.json()
        setError(data.message || 'Errore durante la registrazione')
      }
    } catch (error) {
      setError('Si è verificato un errore. Riprova più tardi.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#FF7F27]">Registrati</CardTitle>
          <CardDescription className="text-zinc-400">
            Crea un nuovo account per iniziare a utilizzare TaxiRentNcc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Scegli una password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            {error && <p className="text-red-500" role="alert">{error}</p>}
            <Button type="submit" className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white">
              Registrati
            </Button>
          </form>
          <p className="mt-4 text-center text-zinc-400">
            Hai già un account?{' '}
            <a href="/login" className="text-[#FF7F27] hover:underline">
              Accedi
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
