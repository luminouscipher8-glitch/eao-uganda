import { Request, Response } from 'express';
export declare class AuthController {
    /**
     * Register a new user
     */
    register: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Login user
     */
    login: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Logout user
     */
    logout: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get current user profile
     */
    getProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update user profile
     */
    updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Change password
     */
    changePassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Forgot password
     */
    forgotPassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Reset password
     */
    resetPassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Refresh token
     */
    refreshToken: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=authController.d.ts.map