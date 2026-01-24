import { Request, Response } from 'express';
export declare class UserController {
    /**
     * Get current user profile
     */
    getProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update user profile
     */
    updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get all users (admin only)
     */
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete user account (admin or self)
     */
    deleteAccount: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=userController.d.ts.map