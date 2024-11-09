import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const AbbonamentPage: React.FC = () => {
  const plans = [
    {
      name: "Base",
      price: "33",
      description: "1 corsa al giorno",
      features: [
        "1 corsa giornaliera",
        "Valido nell'area di Monopoli",
        "Prenotazione facile",
        "Assistenza clienti via email"
      ],
    },
    {
      name: "Premium",
      price: "55",
      description: "2 corse al giorno",
      features: [
        "2 corse giornaliere",
        "Valido nell'area di Monopoli",
        "Prenotazione prioritaria",
        "Scelta dell'orario preferito",
        "Assistenza clienti telefonica"
      ],
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
        "Servizio clienti dedicato 24/7",
        "Veicoli di lusso disponibili"
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FF7F27]">I Nostri Abbonamenti</h1>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Scegli il piano perfetto per le tue esigenze di mobilità a Monopoli. Tutti i nostri abbonamenti offrono un servizio di linea condiviso, permettendoti di viaggiare comodamente e risparmiare sui tuoi spostamenti quotidiani.
        </p>
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
                <Button className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white">
                  Scegli {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#FF7F27]">Perché scegliere TaxiRentNcc?</h2>
          <ul className="text-left max-w-2xl mx-auto space-y-2">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
              <span>Servizio affidabile e puntuale</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
              <span>Autisti professionisti e cortesi</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
              <span>Veicoli moderni e confortevoli</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
              <span>Risparmio sui costi di trasporto</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#FF7F27] mr-2" />
              <span>Contributo alla riduzione del traffico e dell'inquinamento</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AbbonamentPage
