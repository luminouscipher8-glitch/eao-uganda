import { PrismaClient } from '@prisma/client';
declare global {
    var __prisma: PrismaClient | undefined;
}
declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export { prisma };
export declare const db: {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findUserProfile(userId: string): Promise<({
        authUser: {
            id: string;
            email: string;
            phone: string | null;
            created_at: Date;
        };
    } & {
        id: string;
        userId: string;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        bio: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    createUserProfile(data: any): Promise<{
        authUser: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        bio: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserProfile(userId: string, data: any): Promise<{
        authUser: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        username: string | null;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        bio: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createContact(data: any): Promise<{
        user: {
            id: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string | null;
        name: string;
        subject: string;
        message: string;
        company: string | null;
        status: import(".prisma/client").$Enums.ContactStatus;
    }>;
    getContacts(params: {
        page: number;
        limit: number;
        status?: string;
    }): Promise<{
        contacts: ({
            user: {
                id: string;
                email: string;
            } | null;
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phone: string | null;
            name: string;
            subject: string;
            message: string;
            company: string | null;
            status: import(".prisma/client").$Enums.ContactStatus;
        })[];
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    createDonation(data: any): Promise<{
        user: {
            id: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        status: import(".prisma/client").$Enums.DonationStatus;
        amount: number;
        currency: string;
        flutterwaveTxRef: string | null;
        flutterwaveTransactionId: string | null;
        is_anonymous: boolean;
        donor_name: string | null;
        donor_email: string | null;
        donor_phone: string | null;
        payment_method: string | null;
        is_recurring: boolean;
        payment_id: string | null;
        campaignId: string | null;
    }>;
    updateDonation(id: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        message: string | null;
        status: import(".prisma/client").$Enums.DonationStatus;
        amount: number;
        currency: string;
        flutterwaveTxRef: string | null;
        flutterwaveTransactionId: string | null;
        is_anonymous: boolean;
        donor_name: string | null;
        donor_email: string | null;
        donor_phone: string | null;
        payment_method: string | null;
        is_recurring: boolean;
        payment_id: string | null;
        campaignId: string | null;
    }>;
    getDonations(params: {
        page: number;
        limit: number;
        userId?: string;
    }): Promise<{
        donations: ({
            user: {
                id: string;
                email: string;
            } | null;
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            message: string | null;
            status: import(".prisma/client").$Enums.DonationStatus;
            amount: number;
            currency: string;
            flutterwaveTxRef: string | null;
            flutterwaveTransactionId: string | null;
            is_anonymous: boolean;
            donor_name: string | null;
            donor_email: string | null;
            donor_phone: string | null;
            payment_method: string | null;
            is_recurring: boolean;
            payment_id: string | null;
            campaignId: string | null;
        })[];
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    createAnalyticsEvent(data: any): Promise<{
        user: {
            id: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        eventName: string;
        eventData: import("@prisma/client/runtime/library").JsonValue | null;
        sessionId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        referrer: string | null;
    }>;
    getAnalyticsEvents(params: {
        page: number;
        limit: number;
        eventName?: string;
        userId?: string;
    }): Promise<{
        events: ({
            user: {
                id: string;
                email: string;
            } | null;
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            eventName: string;
            eventData: import("@prisma/client/runtime/library").JsonValue | null;
            sessionId: string | null;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
        })[];
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    subscribeToNewsletter(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        is_active: boolean;
        source: string | null;
    }>;
    getNewsletterSubscriptions(params: {
        page: number;
        limit: number;
    }): Promise<{
        subscriptions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            is_active: boolean;
            source: string | null;
        }[];
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    createCampaign(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        title: string;
        description: string;
        goalAmount: number;
        currentAmount: number;
        startDate: Date;
        endDate: Date;
        imageUrl: string | null;
    }>;
    getCampaigns(params: {
        page: number;
        limit: number;
        isActive?: boolean;
    }): Promise<{
        campaigns: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            title: string;
            description: string;
            goalAmount: number;
            currentAmount: number;
            startDate: Date;
            endDate: Date;
            imageUrl: string | null;
        }[];
        total: number;
        pages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getCampaignById(id: string): Promise<({
        donations: {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            message: string | null;
            status: import(".prisma/client").$Enums.DonationStatus;
            amount: number;
            currency: string;
            flutterwaveTxRef: string | null;
            flutterwaveTransactionId: string | null;
            is_anonymous: boolean;
            donor_name: string | null;
            donor_email: string | null;
            donor_phone: string | null;
            payment_method: string | null;
            is_recurring: boolean;
            payment_id: string | null;
            campaignId: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        title: string;
        description: string;
        goalAmount: number;
        currentAmount: number;
        startDate: Date;
        endDate: Date;
        imageUrl: string | null;
    }) | null>;
};
export default db;
//# sourceMappingURL=database.d.ts.map