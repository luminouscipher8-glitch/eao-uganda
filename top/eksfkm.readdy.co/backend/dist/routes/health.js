import { Router } from 'express';
const router = Router();
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 */
router.get('/', (req, res) => {
    const response = {
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
        },
    };
    res.status(200).json(response);
});
export { router as healthRoutes };
//# sourceMappingURL=health.js.map