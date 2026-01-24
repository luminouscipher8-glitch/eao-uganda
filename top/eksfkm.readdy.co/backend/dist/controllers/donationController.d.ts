import { Request, Response } from 'express';
export declare class DonationController {
    /**
     * Create a donation payment intent with Flutterwave
     */
    createPayment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Verify Flutterwave webhook
     */
    verifyWebhook: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get donation by ID
     */
    getDonation: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get all donations (admin or user's own donations)
     */
    getDonations: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get campaign donations
     */
    getCampaignDonations: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=donationController.d.ts.map