import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
type AppRole = 'admin' | 'authenticated';
export declare class SupabaseAuth {
    private static readonly SUPABASE_URL;
    private static readonly SUPABASE_ANON_KEY;
    private static supabase;
    static verifySupabaseToken(token: string): Promise<{
        userId: any;
        email: any;
        role: AppRole;
        aud: any;
        exp: number;
        iat: number;
    }>;
    static authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    static optionalAuth: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => Promise<void>;
    static authorize: (allowedRoles: AppRole[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
    static requireAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
    static extractUserId(req: AuthenticatedRequest): string | null;
    static isAuthenticated(req: AuthenticatedRequest): boolean;
    static requireAdminVerification: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
}
export {};
//# sourceMappingURL=supabaseAuth.d.ts.map