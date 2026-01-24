import { db } from '@/utils/database.js';
import { SupabaseAuth } from '@/middleware/supabaseAuth.js';
import { AppError, asyncHandler } from '@/middleware/errorHandler.js';
export class UserController {
    /**
     * Get current user profile
     */
    getProfile = asyncHandler(async (req, res) => {
        const userId = SupabaseAuth.extractUserId(req);
        if (!userId) {
            throw new AppError('User not authenticated', 401);
        }
        let userProfile = await db.findUserProfile(userId);
        // If profile doesn't exist, create one
        if (!userProfile) {
            userProfile = await db.createUserProfile({
                userId,
                role: 'USER',
                isActive: true,
            });
        }
        const response = {
            success: true,
            data: { user: userProfile },
        };
        res.status(200).json(response);
    });
    /**
     * Update user profile
     */
    updateProfile = asyncHandler(async (req, res) => {
        const userId = SupabaseAuth.extractUserId(req);
        if (!userId) {
            throw new AppError('User not authenticated', 401);
        }
        const { username, firstName, lastName, bio, avatar } = req.body;
        // Check if username is taken (if being updated)
        if (username) {
            const existingProfile = await db.prisma.userProfile.findFirst({
                where: {
                    username,
                    userId: { not: userId },
                },
            });
            if (existingProfile) {
                throw new AppError('Username is already taken', 409);
            }
        }
        const updatedProfile = await db.updateUserProfile(userId, {
            username,
            firstName,
            lastName,
            bio,
            avatar,
        });
        const response = {
            success: true,
            data: { user: updatedProfile },
            message: 'Profile updated successfully',
        };
        res.status(200).json(response);
    });
    /**
     * Get all users (admin only)
     */
    getAllUsers = asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const [users, total] = await Promise.all([
            db.prisma.userProfile.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    authUser: {
                        select: {
                            id: true,
                            email: true,
                            created_at: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            db.prisma.userProfile.count(),
        ]);
        const response = {
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                    hasNext: page * limit < total,
                    hasPrev: page > 1,
                },
            },
        };
        res.status(200).json(response);
    });
    /**
     * Delete user account (admin or self)
     */
    deleteAccount = asyncHandler(async (req, res) => {
        const targetUserId = req.params.id;
        const currentUserId = SupabaseAuth.extractUserId(req);
        if (!currentUserId) {
            throw new AppError('User not authenticated', 401);
        }
        // Users can only delete their own account unless they're admin
        if (currentUserId !== targetUserId && req.user?.role !== 'admin') {
            throw new AppError('Insufficient permissions', 403);
        }
        // Delete user profile (Supabase handles auth user deletion)
        await db.prisma.userProfile.delete({
            where: { userId: targetUserId || '' },
        });
        const response = {
            success: true,
            message: 'Account deleted successfully',
        };
        res.status(200).json(response);
    });
}
//# sourceMappingURL=userController.js.map