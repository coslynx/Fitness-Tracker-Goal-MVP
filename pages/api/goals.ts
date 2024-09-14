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
    const { name, target, deadline } = req.body;

    try {
      const goal = await prisma.goal.create({
        data: {
          name,
          target,
          deadline,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      return res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: session.user.id,
        },
      });

      return res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, target, deadline } = req.body;

    try {
      const goal = await prisma.goal.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          target,
          deadline,
        },
      });

      return res.status(200).json(goal);
    } catch (error) {
      console.error('Error updating goal:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const goal = await prisma.goal.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      return res.status(200).json(goal);
    } catch (error) {
      console.error('Error deleting goal:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}