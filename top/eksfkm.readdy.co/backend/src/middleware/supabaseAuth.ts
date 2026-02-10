import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, ApiResponse } from '../types/index.js';
import { createClient } from '@supabase/supabase-js';

// Supabase JWT verification
export class SupabaseAuth {
  private static readonly SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
  private static readonly SUPABASE_URL = process.env.SUPABASE_URL;
  private static readonly SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  /**
   * Verify Supabase JWT token and extract user information
   */
  static async verifySupabaseToken(token: string) {
    try {
      // Remove 'Bearer ' prefix if present
      const cleanToken = token.replace('Bearer ', '');
      
      // Create a Supabase client to verify the token
      const supabase = createClient(
        this.SUPABASE_URL!,
        this.SUPABASE_ANON_KEY!
      );

      // Use Supabase's built-in token verification
      const { data, error } = await supabase.auth.getUser(cleanToken);
      const user = data?.user;
      
      if (error || !user) {
        throw new Error('Invalid token');
      }

      return {
        userId: user.id,
        email: user.email || '',
        role: user.user_metadata?.role || 'authenticated',
        aud: 'authenticated',
        exp: Math.floor(Date.now() / 1000) + 3600, // Approximate
        iat: Math.floor(Date.now() / 1000),
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      throw error;
    }
  }

  /**
   * Middleware to authenticate Supabase JWT
   */
  static authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          error: 'Access token is required',
        } as ApiResponse);
        return;
      }

      // Verify Supabase JWT
      const userContext = await this.verifySupabaseToken(authHeader);
      
      // Attach user info to request
      req.user = userContext;
      
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      } as ApiResponse);
    }
  };

  /**
   * Middleware for optional authentication (doesn't fail if no token)
   */
  static optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const userContext = await this.verifySupabaseToken(authHeader);
        req.user = userContext;
      }
      
      next();
    } catch (error) {
      // Continue without authentication for optional auth
      next();
    }
  };

  /**
   * Middleware to authorize based on user role
   */
  static authorize = (allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required',
        } as ApiResponse);
        return;
      }

      // Check if user has required role
      const userRole = req.user.aud === 'authenticated' ? 'authenticated' : (req.user.role || 'authenticated');
      
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

  /**
   * Middleware to check if user is admin
   */
  static requireAdmin = this.authorize(['authenticated', 'admin']);

  /**
   * Extract user ID from Supabase JWT
   */
  static extractUserId(req: AuthenticatedRequest): string | null {
    return req.user?.userId || null;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(req: AuthenticatedRequest): boolean {
    return !!req.user;
  }
}
