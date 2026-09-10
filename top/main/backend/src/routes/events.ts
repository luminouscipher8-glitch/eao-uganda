import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all upcoming events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of upcoming events
 */
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: 'SCHEDULED',
        event_date: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        event_date: true,
        location: true,
        image: true,
        current_attendees: true,
        funds_raised: true,
        currency: true
      },
      orderBy: {
        event_date: 'asc'
      }
    });

    // Transform to match frontend interface
    const transformedEvents = events.map(event => ({
  id: event.id,
  title: event.title,
  description: event.description,
  date: event.event_date.toISOString(),
  location: event.location,
  image: event.image || '/images/default-event.jpg',
  participants: event.current_attendees ? `${event.current_attendees}+` : undefined,
  raised: event.funds_raised ? `${event.currency} ${event.funds_raised.toLocaleString()}` : undefined
}));

    const response: ApiResponse = {
      success: true,
      data: transformedEvents,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    };
    res.status(500).json(response);
  }
}));

export { router as eventsRoutes };
