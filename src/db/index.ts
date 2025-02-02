import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


export async function createClient() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not defined');
    }
    const client = postgres( process.env.DATABASE_URL, { prepare: false } );
    const db = drizzle( { client } );
    return db;
}
