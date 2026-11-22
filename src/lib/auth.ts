import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const g = globalThis as unknown as { _fixmateMongo?: MongoClient };
const client = (g._fixmateMongo ??= new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'));
const db = client.db(process.env.DB_NAME || 'fixmate');

const origins = (process.env.TRUSTED_ORIGINS || process.env.BETTER_AUTH_URL || 'http://localhost:3000')
  .split(',').map((s) => s.trim()).filter(Boolean);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: origins,
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: true },
  socialProviders: process.env.GOOGLE_CLIENT_ID
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET as string } }
    : {},
  user: {
    additionalFields: {
      role: { type: 'string', required: false, defaultValue: 'customer', input: true },
      phone: { type: 'string', required: false, defaultValue: '', input: true },
      area: { type: 'string', required: false, defaultValue: '', input: true },
      bio: { type: 'string', required: false, defaultValue: '', input: true },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Server-side guarantee: only customer/technician may be chosen at sign-up. Never admin.
        before: async (user: any) => ({
          data: { ...user, role: ['customer', 'technician'].includes(user.role) ? user.role : 'customer' },
        }),
      },
      update: {
        // Role can never be changed through BetterAuth's update-user endpoint (admins use the Express API).
        before: async (user: any) => {
          const { role, ...rest } = user;
          return { data: rest };
        },
      },
    },
  },
});
