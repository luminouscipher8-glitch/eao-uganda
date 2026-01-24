import { JwtPayload } from '@/types/index.js';
export declare class AuthUtils {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
    static verifyToken(token: string): JwtPayload;
    static generateSessionToken(): string;
    static isValidEmail(email: string): boolean;
    static validatePassword(password: string): {
        isValid: boolean;
        errors: string[];
    };
    static validateUsername(username: string): {
        isValid: boolean;
        errors: string[];
    };
    static generateEmailVerificationToken(): string;
    static generatePasswordResetToken(): string;
    static isTokenExpired(createdAt: Date, expiresInHours?: number): boolean;
}
export default AuthUtils;
//# sourceMappingURL=auth.d.ts.map