import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { db } from '../utils/database.js';
const router = Router();
router.post('/', SupabaseAuth.optionalAuth, [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('phone').optional().trim().isLength({ max: 30 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: errors.array()[0]?.msg || 'Invalid request',
        });
        return;
    }
    try {
        const { name, email, subject, message, phone } = req.body;
        const contact = await db.createContact({
            name,
            email,
            subject,
            message,
            phone: phone || null,
            status: 'PENDING',
            userId: req.user?.userId || null,
        });
        res.status(201).json({
            success: true,
            data: {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                subject: contact.subject,
                message: contact.message,
                status: 'pending',
                created_at: contact.createdAt,
            },
            message: 'Contact message submitted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to submit contact form',
        });
    }
});
export { router as contactRoutes };
//# sourceMappingURL=contact.js.map