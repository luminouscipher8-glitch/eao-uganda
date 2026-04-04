import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { db } from '../utils/database.js';
const router = Router();
router.post('/events', SupabaseAuth.optionalAuth, [
    body('eventName').trim().notEmpty().withMessage('eventName is required'),
    body('eventData').optional().isObject(),
    body('sessionId').optional().isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: errors.array()[0]?.msg || 'Invalid analytics payload',
        });
        return;
    }
    try {
        const { eventName, eventData, sessionId } = req.body;
        const event = await db.createAnalyticsEvent({
            userId: req.user?.userId || null,
            eventName,
            eventData: eventData || null,
            sessionId: sessionId || null,
            ipAddress: req.ip,
            userAgent: req.get('user-agent') || null,
            referrer: req.get('referer') || null,
        });
        res.status(201).json({
            success: true,
            data: {
                id: event.id,
                eventName: event.eventName,
                createdAt: event.createdAt,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to store analytics event',
        });
    }
});
export { router as analyticsRoutes };
//# sourceMappingURL=analytics.js.map