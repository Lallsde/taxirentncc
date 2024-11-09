"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Check, ChevronRight, Clock, MapPin } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { it } from "date-fns/locale"

// Steps component for booking process
const Steps = ({ currentStep, children }: { currentStep: number; children: React.ReactNode }) => {
return (
  <div className="flex justify-between mb-8">
    {React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          isActive: index === currentStep,
          isCompleted: index < currentStep,
          stepNumber: index + 1,
        })
      }
      return child
    })}
  </div>
)
}

const Step = ({ children, isActive, isCompleted, stepNumber, icon }: { 
children: React.ReactNode
isActive?: boolean
isCompleted?: boolean
stepNumber: number
icon: React.ReactNode
}) => {
return (
  <div className={`flex items-center ${isActive ? 'text-[#FF7F27]' : 'text-white'}`}>
    <div className={`
      flex items-center justify-center w-8 h-8 rounded-full mr-2
      ${isCompleted ? 'bg-[#FF7F27]' : 'bg-zinc-700'}
      ${isActive ? 'border-2 border-[#FF7F27]' : ''}
    `}>
      {isCompleted ? <Check className="w-5 h-5 text-white" /> : icon}
    </div>
    <span>{children}</span>
  </div>
)
}

export default function MainPage() {
const [selectedPlan, setSelectedPlan] = useState("")
const [currentStep, setCurrentStep] = useState(0)
const [date, setDate] = useState<Date>()

const plans = [
  {
    name: "Base",
    price: "33",
    description: "1 corsa al giorno",
    features: ["1 corsa giornaliera", "Valido nell'area di Monopoli", "Prenotazione facile"],
  },
  {
    name: "Premium",
    price: "55",
    description: "2 corse al giorno",
    features: ["2 corse giornaliere", "Valido nell'area di Monopoli", "Prenotazione prioritaria", "Scelta dell'orario preferito"],
  },
  {
    name: "Gold",
    price: "99",
    description: "4 corse al giorno",
    features: [
      "4 corse giornaliere",
      "Valido nell'area di Monopoli",
      "Prenotazione prioritaria",
      "Scelta dell'orario preferito",
      "Servizio clienti dedicato",
    ],
  },
]

return (
  <div className="min-h-screen bg-black">
    {/* Hero Section */}
    <div className="relative h-[500px] flex items-center justify-center bg-gradient-to-b from-[#FF7F27] to-black">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="TaxiRentNcc Logo"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          TaxiRentNcc
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
          Viaggia smart con il nostro servizio di linea condiviso. 
          Abbonati e risparmia sui tuoi spostamenti quotidiani nell'area di Monopoli.
        </p>
      </div>
    </div>

    {/* Subscription Section */}
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2 text-[#FF7F27]">I Nostri Abbonamenti</h2>
      <p className="text-center mb-4 text-white">
        Scegli il piano perfetto per le tue esigenze di mobilità a Monopoli
      </p>
      <p className="text-center mb-8 text-white">
        Il nostro servizio di linea ti permette di viaggiare comodamente insieme ad altri ospiti,
        utilizzando i mezzi esclusivi di TaxiRentNcc. Risparmia e contribuisci a ridurre il traffico!
      </p>

      <Steps currentStep={currentStep}>
        <Step icon={<ChevronRight />}>Scegli il tuo piano</Step>
        <Step icon={<ChevronRight />}>Prenota la tua corsa</Step>
        <Step icon={<ChevronRight />}>Conferma</Step>
      </Steps>

      {currentStep === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FF7F27]">{plan.name}</CardTitle>
                <CardDescription className="text-white">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4 text-white">
                  €{plan.price} <span className="text-lg font-normal text-zinc-400">/mese</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-white">
                      <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90"
                  onClick={() => {
                    setSelectedPlan(plan.name)
                    setCurrentStep(1)
                  }}
                >
                  Scegli {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : currentStep === 1 ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#FF7F27]">Prenota la tua corsa</CardTitle>
            <CardDescription className="text-white">
              Abbonamento selezionato: {selectedPlan}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Data e Ora
                </Label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-zinc-800 text-white border-zinc-700 w-full justify-start text-left font-normal"
                      >
                        {date ? format(date, "PPP", { locale: it }) : "Seleziona una data"}
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
                  <Select>
                    <SelectTrigger className="bg-zinc-800 text-white border-zinc-700">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-white flex items-center">
                <MapPin className="mr-2" /> Indirizzo di partenza
              </Label>
              <Input
                id="pickup"
                placeholder="Inserisci l'indirizzo di partenza"
                className="bg-zinc-800 text-white border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoff" className="text-white flex items-center">
                <MapPin className="mr-2" /> Indirizzo di arrivo
              </Label>
              <Input
                id="dropoff"
                placeholder="Inserisci l'indirizzo di arrivo"
                className="bg-zinc-800 text-white border-zinc-700"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90"
              onClick={() => setCurrentStep(2)}
            >
              Conferma Prenotazione
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#FF7F27]">Prenotazione Confermata</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-lg">Grazie per aver prenotato con TaxiRentNcc!</p>
            <p className="text-white mt-4">Riepilogo della tua prenotazione:</p>
            <ul className="list-disc list-inside text-white mt-2">
              <li>Piano: {selectedPlan}</li>
              <li>Data: {date ? format(date, "PPP", { locale: it }) : ""}</li>
              <li>Partenza: [Indirizzo di partenza]</li>
              <li>Arrivo: [Indirizzo di arrivo]</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90"
              onClick={() => setCurrentStep(0)}
            >
              Nuova Prenotazione
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  </div>
)
}