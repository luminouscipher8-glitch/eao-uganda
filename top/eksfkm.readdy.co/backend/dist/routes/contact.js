import { Router } from 'express';
const router = Router();
// Placeholder contact routes - to be implemented
router.post('/', (req, res) => {
    const response = {
        success: true,
        message: 'Contact routes - to be implemented',
    };
    res.json(response);
});
export { router as contactRoutes };
//# sourceMappingURL=contact.js.map