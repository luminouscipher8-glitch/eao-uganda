import jwt from 'jsonwebtoken';
// Supabase JWT verification
export class SupabaseAuth {
    static SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
    static SUPABASE_URL = process.env.SUPABASE_URL;
    /**
     * Verify Supabase JWT token and extract user information
     */
    static verifySupabaseToken(token) {
        try {
            if (!this.SUPABASE_JWT_SECRET) {
                throw new Error('SUPABASE_JWT_SECRET environment variable is not set');
            }
            // Remove 'Bearer ' prefix if present
            const cleanToken = token.replace('Bearer ', '');
            // Verify JWT token issued by Supabase
            const decoded = jwt.verify(cleanToken, this.SUPABASE_JWT_SECRET, {
                algorithms: ['HS256'],
                issuer: `https://${this.SUPABASE_URL?.replace('https://', '')}/auth/v1`,
            });
            return {
                userId: decoded.sub,
                email: decoded.email,
                role: decoded.role || 'authenticated',
                aud: decoded.aud,
                exp: decoded.exp,
                iat: decoded.iat,
            };
        }
        catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Invalid token');
            }
            else if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token expired');
            }
            throw error;
        }
    }
    /**
     * Middleware to authenticate Supabase JWT
     */
    static authenticate = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({
                    success: false,
                    error: 'Access token is required',
                });
                return;
            }
            // Verify Supabase JWT
            const userContext = this.verifySupabaseToken(authHeader);
            // Attach user info to request
            req.user = userContext;
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed',
            });
        }
    };
    /**
     * Middleware for optional authentication (doesn't fail if no token)
     */
    static optionalAuth = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const userContext = this.verifySupabaseToken(authHeader);
                req.user = userContext;
            }
            next();
        }
        catch (error) {
            // Continue without authentication for optional auth
            next();
        }
    };
    /**
     * Middleware to authorize based on user role
     */
    static authorize = (allowedRoles) => {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                });
                return;
            }
            // Check if user has required role
            const userRole = req.user.aud === 'authenticated' ? 'authenticated' : (req.user.role || 'authenticated');
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({
                    success: false,
                    error: 'Insufficient permissions',
                });
                return;
            }
            next();
        };
    };
    /**
     * Middleware to check if user is admin
     */
    static requireAdmin = this.authorize(['authenticated', 'admin']);
    /**
     * Extract user ID from Supabase JWT
     */
    static extractUserId(req) {
        return req.user?.userId || null;
    }
    /**
     * Check if user is authenticated
     */
    static isAuthenticated(req) {
        return !!req.user;
    }
}
//# sourceMappingURL=supabaseAuth.js.map