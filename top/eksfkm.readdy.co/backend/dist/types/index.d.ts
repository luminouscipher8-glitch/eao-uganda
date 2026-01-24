import { Request } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface JwtPayload {
    userId: string;
    email: string;
    role?: string;
    aud?: string;
    exp?: number;
    iat?: number;
}
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}
export interface CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    username?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    username?: string;
    bio?: string;
    avatar?: string;
}
export interface CreateContactDto {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
}
export interface CreateDonationDto {
    amount: number;
    currency?: string;
    message?: string;
    isAnonymous?: boolean;
}
export interface AnalyticsEventDto {
    eventName: string;
    eventData?: Record<string, any>;
    sessionId?: string;
}
//# sourceMappingURL=index.d.ts.map