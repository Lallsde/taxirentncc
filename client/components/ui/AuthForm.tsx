import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type AuthFormProps = {
  onSubmit: (data: { name?: string; email: string; password: string }) => void
  isLogin: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(isLogin ? { email, password } : { name, email, password })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#FF7F27]">
          {isLogin ? 'Accedi' : 'Registrati'}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {isLogin ? 'Inserisci le tue credenziali per accedere' : 'Crea un nuovo account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white">
            {isLogin ? 'Accedi' : 'Registrati'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AuthForm
