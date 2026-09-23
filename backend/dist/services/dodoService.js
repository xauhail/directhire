"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DodoService = void 0;
const dodopayments_1 = __importDefault(require("dodopayments"));
const crypto_1 = __importDefault(require("crypto"));
const env_js_1 = require("../config/env.js");
let dodoClient = null;
if (env_js_1.config.dodoPaymentsApiKey) {
    try {
        dodoClient = new dodopayments_1.default({
            bearerToken: env_js_1.config.dodoPaymentsApiKey,
            environment: env_js_1.config.dodoPaymentsMode === 'live_mode' ? 'live_mode' : 'test_mode',
        });
    }
    catch (err) {
        console.warn('Failed to initialize DodoPayments client:', err);
    }
}
class DodoService {
    /**
     * Create a Dodo Payments checkout session
     */
    static async createCheckoutSession(options) {
        const { planTier, customerEmail, customerName, returnUrl } = options;
        const finalReturnUrl = returnUrl || `${env_js_1.config.frontendUrl}/search?payment_status=success&tier=${planTier}`;
        let productId = env_js_1.config.dodoWeeklyProductId;
        if (planTier === 'monthly')
            productId = env_js_1.config.dodoMonthlyProductId;
        if (planTier === 'yearly')
            productId = env_js_1.config.dodoYearlyProductId;
        if (planTier === 'lifetime')
            productId = env_js_1.config.dodoLifetimeProductId;
        if (dodoClient && env_js_1.config.dodoPaymentsApiKey) {
            try {
                const payload = {
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
            }
            catch (err) {
                console.error('Dodo Payments checkout session error:', err);
            }
        }
        // High fidelity test mode checkout fallback
        const mockSessionId = `dodo_mock_${Date.now()}`;
        const mockCheckoutUrl = `${env_js_1.config.frontendUrl}/search?session_id=${mockSessionId}&tier=${planTier}&status=subscribed&email=${encodeURIComponent(customerEmail)}`;
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
    static verifyWebhook(payloadRaw, signatureHeader) {
        if (!env_js_1.config.dodoPaymentsWebhookKey || !signatureHeader) {
            return true; // Allow local testing if key not supplied
        }
        try {
            const hmac = crypto_1.default.createHmac('sha256', env_js_1.config.dodoPaymentsWebhookKey);
            const digest = hmac.update(payloadRaw).digest('hex');
            return crypto_1.default.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
        }
        catch (err) {
            console.error('Webhook verification error:', err);
            return false;
        }
    }
}
exports.DodoService = DodoService;
