import React from 'react'
import { Calendar as CalendarIcon, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { it } from "date-fns/locale"

export default function BookingPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [pickupLocation, setPickupLocation] = React.useState("")
  const [dropoffLocation, setDropoffLocation] = React.useState("")
  const [passengers, setPassengers] = React.useState("1")

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-black border-orange-500">
          <CardHeader>
            <CardTitle className="text-orange-500">Prenota il tuo viaggio</CardTitle>
            <CardDescription className="text-white">Compila i dettagli per prenotare il tuo taxi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Data del viaggio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-black border-orange-500 text-white hover:bg-orange-900"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                        {date ? format(date, "PPP", { locale: it }) : "Seleziona una data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-black border-orange-500">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={it}
                        className="bg-black text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Orario preferito</Label>
                  <Select>
                    <SelectTrigger className="bg-black border-orange-500 text-white">
                      <SelectValue placeholder="Seleziona un orario" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-orange-500">
                      <SelectItem value="morning" className="text-white">Mattina (6:00 - 12:00)</SelectItem>
                      <SelectItem value="afternoon" className="text-white">Pomeriggio (12:00 - 18:00)</SelectItem>
                      <SelectItem value="evening" className="text-white">Sera (18:00 - 24:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Punto di partenza</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Inserisci l'indirizzo di partenza"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="bg-black border-orange-500 text-white"
                    />
                    <Button size="icon" variant="ghost" className="text-orange-500 hover:text-orange-400 hover:bg-orange-900">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Destinazione</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Inserisci la destinazione"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="bg-black border-orange-500 text-white"
                    />
                    <Button size="icon" variant="ghost" className="text-orange-500 hover:text-orange-400 hover:bg-orange-900">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Numero di passeggeri</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="bg-black border-orange-500 text-white">
                      <SelectValue placeholder="Seleziona il numero di passeggeri" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-orange-500">
                      <SelectItem value="1" className="text-white">1 passeggero</SelectItem>
                      <SelectItem value="2" className="text-white">2 passeggeri</SelectItem>
                      <SelectItem value="3" className="text-white">3 passeggeri</SelectItem>
                      <SelectItem value="4" className="text-white">4 passeggeri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Note aggiuntive</Label>
                  <Input placeholder="Eventuali richieste speciali" className="bg-black border-orange-500 text-white" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePreviousStep} className="bg-black border-orange-500 text-white hover:bg-orange-900">
                Indietro
              </Button>
            )}
            <Button 
              className={`ml-auto bg-orange-500 text-white hover:bg-orange-600 ${currentStep === 1 ? 'w-full' : ''}`}
              onClick={currentStep === 3 ? () => console.log("Booking submitted") : handleNextStep}
            >
              {currentStep === 3 ? "Prenota ora" : "Avanti"}
              {currentStep !== 3 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
