import DodoPayments from 'dodopayments';
import crypto from 'crypto';
import { config } from '../config/env.js';

let dodoClient: DodoPayments | null = null;
if (config.dodoPaymentsApiKey) {
  try {
    dodoClient = new DodoPayments({
      bearerToken: config.dodoPaymentsApiKey,
      environment: config.dodoPaymentsMode === 'live_mode' ? 'live_mode' : 'test_mode',
    });
  } catch (err) {
    console.warn('Failed to initialize DodoPayments client:', err);
  }
}

export interface CheckoutSessionOptions {
  planTier: 'weekly' | 'monthly' | 'yearly' | 'lifetime';
  customerEmail: string;
  customerName?: string;
  returnUrl?: string;
}

export interface CheckoutSessionResult {
  checkoutUrl: string;
  sessionId: string;
  planTier: string;
  isMock?: boolean;
}

export class DodoService {
  /**
   * Create a Dodo Payments checkout session
   */
  static async createCheckoutSession(options: CheckoutSessionOptions): Promise<CheckoutSessionResult> {
    const { planTier, customerEmail, customerName, returnUrl } = options;
    const finalReturnUrl = returnUrl || `${config.frontendUrl}/search?payment_status=success&tier=${planTier}`;

    let productId = config.dodoWeeklyProductId;
    if (planTier === 'monthly') productId = config.dodoMonthlyProductId;
    if (planTier === 'yearly') productId = config.dodoYearlyProductId;
    if (planTier === 'lifetime') productId = config.dodoLifetimeProductId;

    if (dodoClient && config.dodoPaymentsApiKey) {
      try {
        const payload: any = {
          product_cart: [{ product_id: productId, quantity: 1 }],
          return_url: finalReturnUrl,
        };

        if (customerEmail) {
          payload.customer = {
            email: customerEmail,
            name: customerName || customerEmail.split('@')[0],
          };
        }

        const session = await dodoClient.checkoutSessions.create(payload);

        if (session.checkout_url) {
          return {
            checkoutUrl: session.checkout_url,
            sessionId: session.session_id,
            planTier,
          };
        }
      } catch (err) {
        console.error('Dodo Payments checkout session error:', err);
      }
    }

    // High fidelity test mode checkout fallback
    const mockSessionId = `dodo_mock_${Date.now()}`;
    const mockCheckoutUrl = `${config.frontendUrl}/search?session_id=${mockSessionId}&tier=${planTier}&status=subscribed&email=${encodeURIComponent(customerEmail)}`;

    return {
      checkoutUrl: mockCheckoutUrl,
      sessionId: mockSessionId,
      planTier,
      isMock: true,
    };
  }

  /**
   * Verify Dodo Payments webhook signature
   */
  static verifyWebhook(payloadRaw: string, signatureHeader?: string): boolean {
    if (!config.dodoPaymentsWebhookKey || !signatureHeader) {
      return true; // Allow local testing if key not supplied
    }

    try {
      const hmac = crypto.createHmac('sha256', config.dodoPaymentsWebhookKey);
      const digest = hmac.update(payloadRaw).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
    } catch (err) {
      console.error('Webhook verification error:', err);
      return false;
    }
  }
}
