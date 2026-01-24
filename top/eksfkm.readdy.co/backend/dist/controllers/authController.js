import { AuthUtils } from '@/utils/auth.js';
import { db } from '@/utils/database.js';
import { AppError, asyncHandler } from '@/middleware/errorHandler.js';
export class AuthController {
    /**
     * Register a new user
     */
    register = asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName, username } = req.body;
        // Check if user already exists
        const existingUser = await db.findUserByEmail(email);
        if (existingUser) {
            throw new AppError('User with this email already exists', 409);
        }
        // Validate password
        const passwordValidation = AuthUtils.validatePassword(password);
        if (!passwordValidation.isValid) {
            throw new AppError(passwordValidation.errors.join(', '), 400);
        }
        // Validate username if provided
        if (username) {
            const usernameValidation = AuthUtils.validateUsername(username);
            if (!usernameValidation.isValid) {
                throw new AppError(usernameValidation.errors.join(', '), 400);
            }
        }
        // Hash password
        const hashedPassword = await AuthUtils.hashPassword(password);
        // Create user
        const user = await db.createUser({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
        });
        // Generate tokens
        const token = AuthUtils.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const sessionToken = AuthUtils.generateSessionToken();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await db.createUserSession({
            userId: user.id,
            token: sessionToken,
            expiresAt,
        });
        const response = {
            success: true,
            data: {
                user,
                token,
                sessionToken,
                expiresIn: '7d',
            },
            message: 'User registered successfully',
        };
        res.status(201).json(response);
    });
    /**
     * Login user
     */
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        // Find user
        const user = await db.findUserByEmail(email);
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }
        // Check if user is active
        if (!user.isActive) {
            throw new AppError('Account is deactivated', 401);
        }
        // Verify password
        const isPasswordValid = await AuthUtils.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }
        // Generate tokens
        const token = AuthUtils.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const sessionToken = AuthUtils.generateSessionToken();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await db.createUserSession({
            userId: user.id,
            token: sessionToken,
            expiresAt,
        });
        // Update last login
        await db.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const response = {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
                token,
                sessionToken,
                expiresIn: '7d',
            },
            message: 'Login successful',
        };
        res.status(200).json(response);
    });
    /**
     * Logout user
     */
    logout = asyncHandler(async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.substring(7);
        if (token) {
            await db.deleteUserSession(token);
        }
        const response = {
            success: true,
            message: 'Logout successful',
        };
        res.status(200).json(response);
    });
    /**
     * Get current user profile
     */
    getProfile = asyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const user = await db.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        const response = {
            success: true,
            data: { user },
        };
        res.status(200).json(response);
    });
    /**
     * Update user profile
     */
    updateProfile = asyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const { firstName, lastName, username, bio } = req.body;
        // Check if username is taken (if being updated)
        if (username) {
            const existingUser = await db.prisma.user.findFirst({
                where: {
                    username,
                    id: { not: userId },
                },
            });
            if (existingUser) {
                throw new AppError('Username is already taken', 409);
            }
            const usernameValidation = AuthUtils.validateUsername(username);
            if (!usernameValidation.isValid) {
                throw new AppError(usernameValidation.errors.join(', '), 400);
            }
        }
        const updatedUser = await db.prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                username,
                bio,
            },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                bio: true,
                avatar: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        const response = {
            success: true,
            data: { user: updatedUser },
            message: 'Profile updated successfully',
        };
        res.status(200).json(response);
    });
    /**
     * Change password
     */
    changePassword = asyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;
        // Get user with password
        const user = await db.prisma.user.findUnique({
            where: { id: userId },
            select: { password: true },
        });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        // Verify current password
        const isCurrentPasswordValid = await AuthUtils.comparePassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new AppError('Current password is incorrect', 401);
        }
        // Validate new password
        const passwordValidation = AuthUtils.validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            throw new AppError(passwordValidation.errors.join(', '), 400);
        }
        // Hash new password
        const hashedNewPassword = await AuthUtils.hashPassword(newPassword);
        // Update password
        await db.prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });
        const response = {
            success: true,
            message: 'Password changed successfully',
        };
        res.status(200).json(response);
    });
    /**
     * Forgot password
     */
    forgotPassword = asyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await db.findUserByEmail(email);
        if (!user) {
            // Don't reveal if user exists or not
            const response = {
                success: true,
                message: 'If an account with that email exists, a password reset email has been sent',
            };
            res.status(200).json(response);
            return;
        }
        // Generate reset token
        const resetToken = AuthUtils.generatePasswordResetToken();
        const resetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        // Save reset token
        await db.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires: resetExpires,
            },
        });
        // TODO: Send email with reset link
        // For now, just return success
        const response = {
            success: true,
            message: 'If an account with that email exists, a password reset email has been sent',
        };
        res.status(200).json(response);
    });
    /**
     * Reset password
     */
    resetPassword = asyncHandler(async (req, res) => {
        const { token, newPassword } = req.body;
        // Find user with valid reset token
        const user = await db.prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            throw new AppError('Invalid or expired reset token', 400);
        }
        // Validate new password
        const passwordValidation = AuthUtils.validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            throw new AppError(passwordValidation.errors.join(', '), 400);
        }
        // Hash new password
        const hashedPassword = await AuthUtils.hashPassword(newPassword);
        // Update password and clear reset token
        await db.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
        const response = {
            success: true,
            message: 'Password reset successful',
        };
        res.status(200).json(response);
    });
    /**
     * Refresh token
     */
    refreshToken = asyncHandler(async (req, res) => {
        const { refreshToken } = req.body;
        const session = await db.findUserSession(refreshToken);
        if (!session || session.expiresAt < new Date()) {
            throw new AppError('Invalid or expired refresh token', 401);
        }
        // Generate new access token
        const token = AuthUtils.generateToken({
            userId: session.user.id,
            email: session.user.email,
            role: session.user.role,
        });
        const response = {
            success: true,
            data: {
                token,
                expiresIn: '7d',
            },
            message: 'Token refreshed successfully',
        };
        res.status(200).json(response);
    });
}
//# sourceMappingURL=authController.js.map