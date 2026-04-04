import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiResponse } from '../types/index.js';
import { db } from '../utils/database.js';

const router = Router();

router.post(
  '/',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('name').optional().trim().isLength({ max: 100 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0]?.msg || 'Invalid newsletter payload',
      } as ApiResponse);
      return;
    }

    try {
      const { email } = req.body;

      const subscription = await db.prisma.newsletter.upsert({
        where: { email },
        update: { is_active: true },
        create: {
          email,
          is_active: true,
          source: 'website',
        },
      });

      res.status(201).json({
        success: true,
        data: {
          id: subscription.id,
          email: subscription.email,
          is_active: subscription.is_active,
          created_at: subscription.createdAt,
        },
        message: 'Subscribed successfully',
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to subscribe',
      } as ApiResponse);
    }
  }
);

export { router as newsletterRoutes };