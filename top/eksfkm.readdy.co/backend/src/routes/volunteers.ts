import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiResponse } from '../types/index.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

function mapAvailability(value?: string) {
  const normalized = String(value || '').toLowerCase();

  if (normalized.includes('weekend')) return 'WEEKENDS';
  if (normalized.includes('evening')) return 'EVENINGS';
  if (normalized.includes('full')) return 'FULL_TIME';
  return 'WEEKDAYS';
}

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('skills').isArray().withMessage('Skills must be an array'),
    body('availability').trim().notEmpty().withMessage('Availability is required'),
    body('motivation').trim().notEmpty().withMessage('Motivation is required'),
    body('occupation').optional().trim(),
    body('age').optional().trim(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0]?.msg || 'Invalid volunteer payload',
      } as ApiResponse);
      return;
    }

    try {
      const {
        name,
        email,
        phone,
        age,
        occupation,
        skills,
        availability,
        motivation,
      } = req.body;

      const parsedAge =
        age !== undefined && age !== null && String(age).trim() !== ''
          ? Number(age)
          : null;

      const volunteer = await supabase
        .from('volunteers')
        .insert({
          name: String(name).trim(), // Store as single name field
          email,
          phone,
          skills,
          availability: mapAvailability(availability) as any,
          motivation,
          occupation: occupation || null,
          age: Number.isFinite(parsedAge) ? parsedAge : null,
        })
        .select()
        .single();

      if (volunteer.error) {
        throw new Error(volunteer.error.message);
      }

      res.status(201).json({
        success: true,
        data: {
          id: volunteer.data.id,
          name: volunteer.data.name, // Return single name field
          email: volunteer.data.email,
          phone: volunteer.data.phone,
          skills: volunteer.data.skills,
          availability,
          status: 'pending',
          created_at: volunteer.data.created_at,
        },
        message: 'Volunteer application submitted successfully',
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit volunteer application',
      } as ApiResponse);
    }
  }
);

export { router as volunteerRoutes };