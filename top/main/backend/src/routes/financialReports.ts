import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * @swagger
 * /api/financial-reports:
 *   get:
 *     summary: Get available financial reports
 *     tags: [Financial Reports]
 *     responses:
 *       200:
 *         description: List of available financial reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       period:
 *                         type: string
 *                       downloadUrl:
 *                         type: string
 *                       summary:
 *                         type: string
 */
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  try {
    // Static financial reports data - these would typically be stored in a database or file system
    const financialReports = [
      {
  id: '1',
  title: 'Annual Report 2023',
  period: '2023',
  downloadUrl: '/api/downloads/financial-reports/annual-report-2023.pdf',
  summary: 'Comprehensive annual financial report including revenue, expenses, and impact metrics for 2023.'
},
      {
        id: '2',
        title: 'Q4 2023 Financial Statement',
        period: 'Q4 2023',
        downloadUrl: '/downloads/financial-reports/q4-2023-statement.pdf',
        summary: 'Quarterly financial statement for October-December 2023, including detailed expense breakdown.'
      },
      {
        id: '3',
        title: 'Audited Financial Statements 2022',
        period: '2022',
        downloadUrl: '/downloads/financial-reports/audited-statements-2022.pdf',
        summary: 'Independent audited financial statements for fiscal year 2022 with full compliance documentation.'
      },
      {
        id: '4',
        title: 'Impact Report 2023',
        period: '2023',
        downloadUrl: '/downloads/financial-reports/impact-report-2023.pdf',
        summary: 'Detailed impact report showing how donations were used to support educational programs in 2023.'
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: financialReports
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching financial reports:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch financial reports'
    };
    res.status(500).json(response);
  }
}));

export { router as financialReportsRoutes };
