import { Router } from 'express';
import { ApiResponse } from '@/types/index.js';

const router = Router();

// Placeholder analytics routes - to be implemented
router.post('/events', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'Analytics routes - to be implemented',
  };
  res.json(response);
});

export { router as analyticsRoutes };
