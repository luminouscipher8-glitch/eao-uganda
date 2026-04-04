import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { prisma } from '../utils/prismaClient';
import { asyncHandler } from '../middleware/errorHandler.js';
import type { SuccessStory } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /api/success-stories:
 *   get:
 *     summary: Get all published success stories
 *     tags: [Success Stories]
 *     responses:
 *       200:
 *         description: List of success stories
 */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const successStories = await prisma.successStory.findMany({
        where: { status: 'published' },
        select: {
          id: true,
          student_name: true,
          age: true,
          story: true,
          impact: true,
          category: true,
          image: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      // Transform to match frontend interface
      const transformedStories = successStories.map(
        (story: SuccessStory) => ({
          id: story.id,
          name: story.student_name,
          age: story.age != null ? String(story.age) : '',
          story: story.story,
          impact: story.impact,
          category: story.category,
          image: story.image || '/images/default-story.jpg',
        })
      );

      const response: ApiResponse = {
        success: true,
        data: transformedStories,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('Error fetching success stories:', error?.message ?? error);
      const response: ApiResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch success stories',
      };
      res.status(500).json(response);
    }
  })
);

export { router as successStoriesRoutes };