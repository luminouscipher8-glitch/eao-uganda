import { PrismaClient } from '@prisma/client';
// Prevent multiple instances of Prisma Client in development
const prisma = globalThis.__prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});
if (process.env.NODE_ENV === 'development') {
    globalThis.__prisma = prisma;
}
export { prisma };
// Helper functions for common database operations
export const db = {
    prisma, // Export prisma client directly
    // User profile operations (extended user data)
    async findUserProfile(userId) {
        return prisma.userProfile.findUnique({
            where: { userId },
            include: {
                authUser: {
                    select: {
                        id: true,
                        email: true,
                        phone: true,
                        created_at: true,
                    },
                },
            },
        });
    },
    async createUserProfile(data) {
        return prisma.userProfile.create({
            data,
            include: {
                authUser: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    async updateUserProfile(userId, data) {
        return prisma.userProfile.update({
            where: { userId },
            data,
            include: {
                authUser: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    // Contact operations
    async createContact(data) {
        return prisma.contact.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    async getContacts(params) {
        const { page, limit, status } = params;
        const skip = (page - 1) * limit;
        const where = status ? { status: status } : {};
        const [contacts, total] = await Promise.all([
            prisma.contact.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma.contact.count({ where }),
        ]);
        return {
            contacts,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        };
    },
    // Donation operations
    async createDonation(data) {
        return prisma.donation.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    async updateDonation(id, data) {
        return prisma.donation.update({
            where: { id },
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    async getDonations(params) {
        const { page, limit, userId } = params;
        const skip = (page - 1) * limit;
        const where = userId ? { userId } : {};
        const [donations, total] = await Promise.all([
            prisma.donation.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma.donation.count({ where }),
        ]);
        return {
            donations,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        };
    },
    // Analytics operations
    async createAnalyticsEvent(data) {
        return prisma.analyticsEvent.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    },
    async getAnalyticsEvents(params) {
        const { page, limit, eventName, userId } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (eventName)
            where.eventName = eventName;
        if (userId)
            where.userId = userId;
        const [events, total] = await Promise.all([
            prisma.analyticsEvent.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma.analyticsEvent.count({ where }),
        ]);
        return {
            events,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        };
    },
    // Newsletter operations
    async subscribeToNewsletter(data) {
        return prisma.newsletter.create({
            data,
        });
    },
    async getNewsletterSubscriptions(params) {
        const { page, limit } = params;
        const skip = (page - 1) * limit;
        const [subscriptions, total] = await Promise.all([
            prisma.newsletter.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.newsletter.count(),
        ]);
        return {
            subscriptions,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        };
    },
    // Campaign operations
    async createCampaign(data) {
        return prisma.campaign.create({
            data,
        });
    },
    async getCampaigns(params) {
        const { page, limit, isActive } = params;
        const skip = (page - 1) * limit;
        const where = isActive !== undefined ? { isActive } : {};
        const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.campaign.count({ where }),
        ]);
        return {
            campaigns,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        };
    },
    async getCampaignById(id) {
        return prisma.campaign.findUnique({
            where: { id },
            include: {
                donations: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    },
};
export default db;
//# sourceMappingURL=database.js.map