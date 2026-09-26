import { getDb } from '../../_lib/db';

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const data: any = await request.json().catch(() => ({}));
    const email = (data.email || '').toLowerCase().trim();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDb(env);
    if (!db) {
      return new Response(JSON.stringify({ error: 'Database connection not available' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update user.emailVerified = true
    const updateRes = await db.query(`
      UPDATE "user"
      SET "emailVerified" = true, "updatedAt" = NOW()
      WHERE LOWER(email) = $1
      RETURNING id, name, email, "emailVerified", "updatedAt"
    `, [email]);

    if (updateRes.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Clean up verification tokens for this user
    await db.query(`
      DELETE FROM verification
      WHERE LOWER(identifier) = $1
    `, [email]);

    return new Response(JSON.stringify({
      success: true,
      message: 'Email successfully verified in database!',
      user: updateRes.rows[0],
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Verification failed', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
