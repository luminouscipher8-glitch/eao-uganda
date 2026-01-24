import { AuthUtils } from '@/utils/auth.js';
import { db } from '@/utils/database.js';
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Access token is required',
            });
            return;
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify JWT token
        const payload = AuthUtils.verifyToken(token);
        // Check if session exists and is valid
        const session = await db.findUserSession(token);
        if (!session || session.expiresAt < new Date()) {
            res.status(401).json({
                success: false,
                error: 'Invalid or expired session',
            });
            return;
        }
        // Check if user is active
        if (!session.user.isActive) {
            res.status(401).json({
                success: false,
                error: 'Account is deactivated',
            });
            return;
        }
        // Attach user info to request
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid or expired token',
        });
    }
};
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: 'Authentication required',
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: 'Insufficient permissions',
            });
            return;
        }
        next();
    };
};
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }
        const token = authHeader.substring(7);
        const payload = AuthUtils.verifyToken(token);
        const session = await db.findUserSession(token);
        if (session && session.expiresAt >= new Date() && session.user.isActive) {
            req.user = payload;
        }
        next();
    }
    catch (error) {
        // Continue without authentication for optional auth
        next();
    }
};
//# sourceMappingURL=auth.js.map