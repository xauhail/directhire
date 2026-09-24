import { Pool } from '@neondatabase/serverless';

let cachedPool: Pool | null = null;
let cachedUri: string | null = null;

export function getDb(env: any): Pool | null {
  const uri = env?.DATABASE_URL;
  if (!uri) {
    return null;
  }
  if (cachedPool && cachedUri === uri) {
    return cachedPool;
  }
  cachedUri = uri;
  cachedPool = new Pool({
    connectionString: uri,
  });
  return cachedPool;
}
