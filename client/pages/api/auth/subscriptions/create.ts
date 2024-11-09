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
    const { planId } = req.body

    const subscription = await prisma.subscription.create({
      data: {
        userId: decodedToken.userId,
        planId,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    })

    res.status(201).json(subscription)
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la creazione dell\'abbonamento' })
  }
}
