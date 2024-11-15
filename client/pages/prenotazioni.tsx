import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import AuthForm from '@/components/AuthForm'

const PrenotazioniPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [pickup, setPickup] = useState<string>('')
  const [dropoff, setDropoff] = useState<string>('')
  const [passengers, setPassengers] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      checkSubscription(token)
    }
  }, [])

  const checkSubscription = async (token: string) => {
    try {
      const response = await fetch('/api/subscriptions/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setIsSubscribed(true)
      }
    } catch (error) {
      console.error('Errore durante il controllo dell\'abbonamento', error)
    }
  }

  const handleAuth = async (data: { name?: string; email: string; password: string }) => {
    const endpoint = data.name ? '/api/auth/register' : '/api/auth/login'
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
        checkSubscription(token)
      }
    } catch (error) {
      console.error('Errore durante l\'autenticazione', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, time, pickup, dropoff, passengers })
      })
      if (response.ok) {
        alert('Prenotazione confermata!')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Errore durante la prenotazione', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AuthForm onSubmit={handleAuth} isLogin={true} />
      </div>
    )
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Card className="bg-zinc-900 border-zinc-800 max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#FF7F27]">Accesso Negato</CardTitle>
            <CardDescription className="text-zinc-400">
              È necessario un abbonamento attivo per accedere a questa pagina.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white mb-4">
              Per favore, sottoscrivi un abbonamento per poter prenotare le tue corse.
            </p>
            <Button className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white" onClick={() => router.push('/abbonamenti')}>
              Vai agli Abbonamenti
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FF7F27]">Prenota la tua corsa</h1>
        <Card className="bg-zinc-900 border-zinc-800 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#FF7F27]">Dettagli della prenotazione</CardTitle>
            <CardDescription className="text-zinc-400">Inserisci i dettagli per la tua prossima corsa</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" /> Data
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}
                      >
                        {date ? format(date, "PPP", { locale: it }) : <span>Seleziona una data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> Ora
                  </Label>
                  <Select onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleziona orario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="18:00">18:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup" className="text-white flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Indirizzo di partenza
                </Label>
                <Input
                  id="pickup"
                  placeholder="Inserisci l'indirizzo di partenza"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff" className="text-white flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Indirizzo di arrivo
                </Label>
                <Input
                  id="dropoff"
                  placeholder="Inserisci l'indirizzo di arrivo"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers" className="text-white">Numero di passeggeri</Label>
                <Select onValueChange={setPassengers}>
                  <SelectTrigger id="passengers" className="w-full">
                    <SelectValue placeholder="Seleziona il numero di passeggeri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white">
                Conferma Prenotazione
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrenotazioniPage
