import { createClient } from '@supabase/supabase-js';
export class SupabaseAuth {
    static SUPABASE_URL = process.env.SUPABASE_URL;
    static SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    // ✅ Reuse single client instance (performance improvement)
    static supabase = createClient(SupabaseAuth.SUPABASE_URL, SupabaseAuth.SUPABASE_ANON_KEY);
    static async verifySupabaseToken(token) {
        const cleanToken = token.replace(/^Bearer\s+/i, '');
        // ✅ Fix TS error safely
        const { data, error } = await this.supabase.auth.getUser(cleanToken);
        const user = data?.user;
        if (error || !user) {
            throw new Error('Invalid token');
        }
        const rawRole = user.user_metadata?.role ||
            user.app_metadata?.role ||
            'authenticated';
        const role = String(rawRole).toLowerCase() === 'admin' ? 'admin' : 'authenticated';
        return {
            userId: user.id,
            email: user.email || '',
            role,
            aud: user.aud || 'authenticated',
            exp: 0,
            iat: 0,
        };
    }
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
            req.user = await this.verifySupabaseToken(authHeader);
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed',
            });
        }
    };
    static optionalAuth = async (req, _res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader?.startsWith('Bearer ')) {
                req.user = await this.verifySupabaseToken(authHeader);
            }
            next();
        }
        catch {
            next();
        }
    };
    static authorize = (allowedRoles) => {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                });
                return;
            }
            const userRole = (req.user.role || 'authenticated');
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
    static requireAdmin = SupabaseAuth.authorize(['admin']);
    static extractUserId(req) {
        return req.user?.userId || null;
    }
    static isAuthenticated(req) {
        return !!req.user;
    }
    static requireAdminVerification = (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
                return;
            }
            const role = req.user.role;
            if (role !== 'admin') {
                res.status(403).json({
                    success: false,
                    error: 'Admin privileges required',
                });
                return;
            }
            next();
        }
        catch {
            res.status(500).json({
                success: false,
                error: 'Admin verification failed',
            });
        }
    };
}
//# sourceMappingURL=supabaseAuth.js.map