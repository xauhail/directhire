import { getDb } from '../../_lib/db';

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const rawBody = await request.text();
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = {};
    }

    const eventType = payload?.event || payload?.type || 'unknown';
    const customerEmail = payload?.data?.customer?.email || payload?.data?.email;
    const subscriptionId = payload?.data?.subscription_id || payload?.data?.id;

    const db = getDb(env);

    if (db && customerEmail) {
      if (eventType === 'payment.succeeded' || eventType === 'subscription.active' || eventType === 'subscription.renewed') {
        const productId = payload?.data?.product_id;
        let plan = 'pro_monthly';
        if (productId === env.DODO_PRODUCT_WEEKLY) plan = 'weekly_pass';
        if (productId === env.DODO_PRODUCT_YEARLY) plan = 'yearly_pass';

        await db.query(`
          UPDATE "user"
          SET 
            "isSubscribed" = true,
            "plan" = $1,
            "subscriptionId" = COALESCE($2, "subscriptionId"),
            "updatedAt" = NOW()
          WHERE LOWER(email) = LOWER($3)
        `, [plan, subscriptionId || null, customerEmail]);
      } else if (eventType === 'subscription.cancelled' || eventType === 'subscription.expired') {
        await db.query(`
          UPDATE "user"
          SET 
            "isSubscribed" = false,
            "plan" = 'free',
            "updatedAt" = NOW()
          WHERE LOWER(email) = LOWER($1)
        `, [customerEmail]);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Webhook processing failed', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
