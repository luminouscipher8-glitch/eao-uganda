import { Router } from 'express';
import { ApiResponse } from '@/types/index.js';

const router = Router();

// Placeholder contact routes - to be implemented
router.post('/', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'Contact routes - to be implemented',
  };
  res.json(response);
});

export { router as contactRoutes };
