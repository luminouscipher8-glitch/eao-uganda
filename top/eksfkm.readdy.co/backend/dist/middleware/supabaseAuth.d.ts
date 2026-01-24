import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/types/index.js';
export declare class SupabaseAuth {
    private static readonly SUPABASE_JWT_SECRET;
    private static readonly SUPABASE_URL;
    /**
     * Verify Supabase JWT token and extract user information
     */
    static verifySupabaseToken(token: string): {
        userId: any;
        email: any;
        role: any;
        aud: any;
        exp: any;
        iat: any;
    };
    /**
     * Middleware to authenticate Supabase JWT
     */
    static authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Middleware for optional authentication (doesn't fail if no token)
     */
    static optionalAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Middleware to authorize based on user role
     */
    static authorize: (allowedRoles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
    /**
     * Middleware to check if user is admin
     */
    static requireAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
    /**
     * Extract user ID from Supabase JWT
     */
    static extractUserId(req: AuthenticatedRequest): string | null;
    /**
     * Check if user is authenticated
     */
    static isAuthenticated(req: AuthenticatedRequest): boolean;
}
//# sourceMappingURL=supabaseAuth.d.ts.map