import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, duration, calories, date } = req.body;

    try {
      const workout = await prisma.workout.create({
        data: {
          name,
          duration,
          calories,
          date,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      return res.status(201).json(workout);
    } catch (error) {
      console.error('Error creating workout:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const workouts = await prisma.workout.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: 'desc',
        },
      });

      return res.status(200).json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}