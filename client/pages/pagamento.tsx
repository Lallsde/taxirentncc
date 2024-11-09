import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckoutForm = ({ planDetails }) => {
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      setError(error.message)
      setProcessing(false)
      return
    }

    const token = localStorage.getItem('token')
    const response = await fetch('/api/subscriptions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        planId: planDetails.id,
        paymentDetails: {
          paymentMethodId: paymentMethod.id
        }
      })
    })

    const result = await response.json()

    if (response.ok) {
      const { clientSecret } = result
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret)

      if (confirmError) {
        setError(confirmError.message)
      } else {
        alert('Pagamento effettuato con successo! Abbonamento attivato.')
        router.push('/prenotazioni')
      }
    } else {
      setError(result.message)
    }

    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <Button 
        type="submit" 
        disabled={!stripe || processing} 
        className="w-full bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white mt-4"
      >
        {processing ? 'Elaborazione...' : `Paga €${planDetails.price}`}
      </Button>
    </form>
  )
}

export default function PagamentoPage() {
  const [planDetails, setPlanDetails] = useState(null)
  const router = useRouter()
  const { planId } = router.query

  useEffect(() => {
    const fetchPlanDetails = async () => {
      // Qui dovresti fare una chiamata API per ottenere i dettagli del piano
      // Per ora, usiamo dati di esempio
      const plans = {
        base: { id: 'base', name: "Base", price: "33" },
        premium: { id: 'premium', name: "Premium", price: "55" },
        gold: { id: 'gold', name: "Gold", price: "99" }
      }
      setPlanDetails(plans[planId])
    }

    if (planId) {
      fetchPlanDetails()
    }
  }, [planId])

  if (!planDetails) {
    return null // O un componente di caricamento
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#FF7F27]">Pagamento Abbonamento</CardTitle>
          <CardDescription className="text-zinc-400">
            Stai acquistando l'abbonamento {planDetails.name} a €{planDetails.price}/mese
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Elements stripe={stripePromise}>
            <CheckoutForm planDetails={planDetails} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  )
}
