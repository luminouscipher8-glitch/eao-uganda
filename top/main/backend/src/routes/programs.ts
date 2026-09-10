// backend/src/routes/programs.ts
import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { prisma } from '../utils/prismaClient.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import type { Program } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Get all active programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: List of active programs
 */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const programs = await prisma.program.findMany({
        where: { is_active: true },
        select: {
          id: true,
          title: true,
          description: true,
          impact: true,
          category: true,
          image: true,
          is_active: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      // Transform data to ensure frontend-friendly defaults
      const transformedPrograms = programs.map((program: Program) => ({
        id: program.id,
        title: program.title,
        description: program.description,
        impact: program.impact,
        category: program.category,
        image: program.image || '/images/default-program.jpg',
        is_active: program.is_active,
        createdAt: program.createdAt,
      }));

      const response: ApiResponse = {
        success: true,
        data: transformedPrograms,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('Error fetching programs:', error?.message ?? error);
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch programs',
      };
      res.status(500).json(response);
    }
  })
);

export { router as programsRoutes };