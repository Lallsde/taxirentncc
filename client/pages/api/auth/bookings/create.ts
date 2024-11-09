import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Non autorizzato' })
  }

  try {
    const decodedToken = verifyToken(token)
    const { date, time, pickup, dropoff, passengers } = req.body

    // Verifica se l'utente ha un abbonamento attivo
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: decodedToken.userId,
        endDate: {
          gte: new Date(),
        },
      },
    })

    if (!activeSubscription) {
      return res.status(403).json({ message: 'Abbonamento non attivo' })
    }

    // Crea la prenotazione
    const booking = await prisma.booking.create({
      data: {
        userId: decodedToken.userId,
        date: new Date(date),
        time,
        pickup,
        dropoff,
        passengers: parseInt(passengers),
      },
    })

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la creazione della prenotazione' })
  }
}
