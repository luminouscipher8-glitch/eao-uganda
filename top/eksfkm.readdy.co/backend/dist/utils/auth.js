import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export class AuthUtils {
    // Password hashing
    static async hashPassword(password) {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }
    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    // JWT token operations
    static generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
            issuer: 'eksfkm-readdy-api',
            audience: 'eksfkm-readdy-client',
        });
    }
    static verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET, {
                issuer: 'eksfkm-readdy-api',
                audience: 'eksfkm-readdy-client',
            });
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    static generateSessionToken() {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Email validation
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Password validation
    static validatePassword(password) {
        const errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (password.length > 128) {
            errors.push('Password must be less than 128 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    // Username validation
    static validateUsername(username) {
        const errors = [];
        if (username.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }
        if (username.length > 30) {
            errors.push('Username must be less than 30 characters long');
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            errors.push('Username can only contain letters, numbers, underscores, and hyphens');
        }
        if (/^[0-9_-]/.test(username)) {
            errors.push('Username cannot start with a number, underscore, or hyphen');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    // Generate email verification token
    static generateEmailVerificationToken() {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Generate password reset token
    static generatePasswordResetToken() {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Check if token is expired
    static isTokenExpired(createdAt, expiresInHours = 24) {
        const expirationTime = new Date(createdAt.getTime() + expiresInHours * 60 * 60 * 1000);
        return new Date() > expirationTime;
    }
}
export default AuthUtils;
//# sourceMappingURL=auth.js.map