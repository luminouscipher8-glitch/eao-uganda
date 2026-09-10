import { Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthenticatedRequest, ApiResponse } from '../types/index.js';
import { getRequiredEnv } from '../lib/supabase.js';

type AppRole = 'admin' | 'authenticated';

type SupabaseUserLike = {
  id: string;
  email?: string | null;
  aud?: string;
  app_metadata?: {
    role?: string | null;
  };
  user_metadata?: {
    role?: string | null;
  };
};

export class SupabaseAuth {
  private static readonly SUPABASE_URL = getRequiredEnv('SUPABASE_URL');
  private static readonly SUPABASE_ANON_KEY =
    getRequiredEnv('SUPABASE_ANON_KEY');

  // ✅ Reuse single client instance (performance improvement)
  private static supabase: SupabaseClient = createClient(
    SupabaseAuth.SUPABASE_URL,
    SupabaseAuth.SUPABASE_ANON_KEY
  );

  static resolveTrustedRole(user?: SupabaseUserLike | null): AppRole {
    // Only app metadata is treated as a trusted source of role claims.
    // user_metadata is user-controlled and must not be used for authorization.
    const trustedRole = user?.app_metadata?.role ?? (typeof (user as any)?.role === 'string' ? (user as any).role : null);
    const normalizedRole =
      typeof trustedRole === 'string' ? trustedRole.trim().toLowerCase() : '';

    if (normalizedRole === 'admin') {
      return 'admin';
    }

    return 'authenticated';
  }

  static async verifySupabaseToken(token: string) {
    const cleanToken = token.replace(/^Bearer\s+/i, '');

    // ✅ Fix TS error safely
    const { data, error } = await (this.supabase.auth as any).getUser(
      cleanToken
    );

    const user = data?.user as SupabaseUserLike | undefined;

    if (error || !user) {
      throw new Error('Invalid token');
    }

    const role = this.resolveTrustedRole(user);

    return {
      userId: user.id,
      email: user.email || '',
      role,
      aud: user.aud || 'authenticated',
      exp: 0,
      iat: 0,
    };
  }

  static authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          error: 'Access token is required',
        } as ApiResponse);
        return;
      }

      req.user = await this.verifySupabaseToken(authHeader);
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      } as ApiResponse);
    }
  };

  static optionalAuth = async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader?.startsWith('Bearer ')) {
        req.user = await this.verifySupabaseToken(authHeader);
      }

      next();
    } catch {
      next();
    }
  };

  static authorize = (allowedRoles: AppRole[]) => {
    return (
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction
    ): void => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required',
        } as ApiResponse);
        return;
      }

      const userRole = (req.user.role || 'authenticated') as AppRole;

      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({
          success: false,
          error: 'Insufficient permissions',
        } as ApiResponse);
        return;
      }

      next();
    };
  };

  static requireAdmin = SupabaseAuth.authorize(['admin']);

  static extractUserId(req: AuthenticatedRequest): string | null {
    return req.user?.userId || null;
  }

  static isAuthenticated(req: AuthenticatedRequest): boolean {
    return !!req.user;
  }

  static requireAdminVerification = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse);
        return;
      }

      const role = req.user.role;

      if (role !== 'admin') {
        res.status(403).json({
          success: false,
          error: 'Admin privileges required',
        } as ApiResponse);
        return;
      }

      next();
    } catch {
      res.status(500).json({
        success: false,
        error: 'Admin verification failed',
      } as ApiResponse);
    }
  };
}
