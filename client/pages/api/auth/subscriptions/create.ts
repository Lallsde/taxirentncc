import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Usa la versione più recente dell'API Stripe
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Non autorizzato' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const { planId, paymentDetails } = req.body

    // Recupera i dettagli del piano dal database
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      return res.status(404).json({ message: 'Piano non trovato' })
    }

    // Crea un PaymentIntent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price * 100, // Stripe usa i centesimi
      currency: 'eur',
      payment_method_types: ['card'],
      description: `Abbonamento ${plan.name}`,
    })

    // Conferma il PaymentIntent
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: paymentDetails.paymentMethodId,
    })

    if (confirmedPaymentIntent.status === 'succeeded') {
      // Crea l'abbonamento nel database
      const subscription = await prisma.subscription.create({
        data: {
          userId: decodedToken.userId,
          planId: plan.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 giorni da ora
          isPaid: true,
          stripePaymentIntentId: confirmedPaymentIntent.id,
        },
      })

      res.status(201).json({ subscription, clientSecret: paymentIntent.client_secret })
    } else {
      res.status(400).json({ message: 'Pagamento fallito' })
    }
  } catch (error) {
    console.error('Errore durante la creazione dell\'abbonamento:', error)
    res.status(500).json({ message: 'Errore durante la creazione dell\'abbonamento' })
  }
}
