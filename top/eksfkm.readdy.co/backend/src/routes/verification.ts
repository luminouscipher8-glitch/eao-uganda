import { Router, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { verificationSystem, VerificationSuite } from '../utils/verification.js';

const router = Router();

/**
 * @swagger
 * /api/verification/run:
 *   post:
 *     summary: Run full system verification
 *     tags: [Verification]
 *     responses:
 *       200:
 *         description: Verification completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     suites:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                           summary:
 *                             type: object
 *                           tests:
 *                             type: array
 *                     report:
 *                       type: string
 *       500:
 *         description: Verification failed
 */

// Run full verification
router.post('/run', asyncHandler(async (req: any, res: Response) => {
  try {
    console.log('Starting full system verification...');
    
    const suites = await verificationSystem.runFullVerification();
    const report = verificationSystem.generateReport(suites);
    
    // Calculate overall status
    const totalTests = suites.reduce((sum, suite) => sum + suite.summary.total, 0);
    const totalPassed = suites.reduce((sum, suite) => sum + suite.summary.passed, 0);
    const totalFailed = suites.reduce((sum, suite) => sum + suite.summary.failed, 0);
    
    const overallSuccess = totalFailed === 0;
    
    // Log report to console
    console.log('\n' + '='.repeat(80));
    console.log('VERIFICATION REPORT');
    console.log('='.repeat(80));
    console.log(report);
    console.log('='.repeat(80));
    
    const response: ApiResponse = {
      success: overallSuccess,
      data: {
        suites,
        report,
        summary: {
          total: totalTests,
          passed: totalPassed,
          failed: totalFailed,
          success: overallSuccess
        }
      }
    };

    res.status(overallSuccess ? 200 : 500).json(response);
  } catch (error) {
    console.error('Verification failed:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed'
    };
    res.status(500).json(response);
  }
}));

/**
 * @swagger
 * /api/verification/health:
 *   get:
 *     summary: Quick health check for verification system
 *     tags: [Verification]
 *     responses:
 *       200:
 *         description: Verification system is healthy
 */

// Quick health check
router.get('/health', asyncHandler(async (req: any, res: Response) => {
  try {
    // Test basic connectivity
    await verificationSystem.testDatabaseConnection();
    
    const response: ApiResponse = {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'Verification system is ready to run tests'
      }
    };

    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Health check failed'
    };
    res.status(500).json(response);
  }
}));

/**
 * @swagger
 * /api/verification/test/{category}:
 *   post:
 *     summary: Run specific test category
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [database, public-api, auth, payment]
 *     responses:
 *       200:
 *         description: Test category completed
 */

// Run specific test category
router.post(
  '/test/:category',
  asyncHandler(async (req: any, res: Response): Promise<void> => {
    try {
      const { category } = req.params;

      verificationSystem.clearResults();
      let suite: VerificationSuite;

      switch (category) {
        case 'database': {
          const dbResults = [
            await verificationSystem.testDatabaseConnection(),
            await verificationSystem.testProgramsSchema(),
            await verificationSystem.testContactsSchema(),
            await verificationSystem.testDonationsSchema(),
          ];

          suite = {
            category: 'Database',
            tests: dbResults,
            summary: {
              total: dbResults.length,
              passed: dbResults.filter((r) => r.status === 'PASS').length,
              failed: dbResults.filter((r) => r.status === 'FAIL').length,
              skipped: dbResults.filter((r) => r.status === 'SKIP').length,
              duration: dbResults.reduce((sum, r) => sum + r.duration, 0),
            },
          };
          break;
        }

        case 'public-api': {
          const publicResults = [
            await verificationSystem.testHealthEndpoint(),
            await verificationSystem.testPublicProgramsEndpoint(),
            await verificationSystem.testPublicContactEndpoint(),
            await verificationSystem.testPublicNewsletterEndpoint(),
            await verificationSystem.testPublicVolunteerEndpoint(),
            await verificationSystem.testAnalyticsEndpoint(),
          ];

          suite = {
            category: 'Public API',
            tests: publicResults,
            summary: {
              total: publicResults.length,
              passed: publicResults.filter((r) => r.status === 'PASS').length,
              failed: publicResults.filter((r) => r.status === 'FAIL').length,
              skipped: publicResults.filter((r) => r.status === 'SKIP').length,
              duration: publicResults.reduce((sum, r) => sum + r.duration, 0),
            },
          };
          break;
        }

        case 'auth': {
          const authResults = [
            await verificationSystem.testAdminAuthRequired(),
            await verificationSystem.testUploadEndpointAuth(),
          ];

          suite = {
            category: 'Authentication',
            tests: authResults,
            summary: {
              total: authResults.length,
              passed: authResults.filter((r) => r.status === 'PASS').length,
              failed: authResults.filter((r) => r.status === 'FAIL').length,
              skipped: authResults.filter((r) => r.status === 'SKIP').length,
              duration: authResults.reduce((sum, r) => sum + r.duration, 0),
            },
          };
          break;
        }

        case 'payment': {
          const paymentResults = [
            await verificationSystem.testDonationCreation(),
            await verificationSystem.testDonationStatusCheck(),
          ];

          suite = {
            category: 'Payment Flow',
            tests: paymentResults,
            summary: {
              total: paymentResults.length,
              passed: paymentResults.filter((r) => r.status === 'PASS').length,
              failed: paymentResults.filter((r) => r.status === 'FAIL').length,
              skipped: paymentResults.filter((r) => r.status === 'SKIP').length,
              duration: paymentResults.reduce((sum, r) => sum + r.duration, 0),
            },
          };
          break;
        }

        default: {
          const response: ApiResponse = {
            success: false,
            error: `Invalid test category: ${category}. Valid categories: database, public-api, auth, payment`,
          };

          res.status(400).json(response);
          return;
        }
      }

      const report = verificationSystem.generateReport([suite]);
      const overallSuccess = suite.summary.failed === 0;

      const response: ApiResponse = {
        success: overallSuccess,
        data: {
          suite,
          report,
        },
      };

      res.status(overallSuccess ? 200 : 500).json(response);
      return;
    } catch (error) {
      console.error(`Test category ${req.params.category} failed:`, error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Test category failed',
      };

      res.status(500).json(response);
      return;
    }
  })
);

export { router as verificationRoutes };
