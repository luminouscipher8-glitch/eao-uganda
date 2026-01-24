import { Router } from 'express';
const router = Router();
// Placeholder analytics routes - to be implemented
router.post('/events', (req, res) => {
    const response = {
        success: true,
        message: 'Analytics routes - to be implemented',
    };
    res.json(response);
});
export { router as analyticsRoutes };
//# sourceMappingURL=analytics.js.map