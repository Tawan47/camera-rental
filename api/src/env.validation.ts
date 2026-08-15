import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  PORT: z.coerce.number().int().positive().optional(),
  CORS_ORIGIN: z.string().min(1).optional(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters — generate one with: ' +
      'node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'),
  ADMIN_USERNAME: z.string().min(1, 'ADMIN_USERNAME is required'),
  ADMIN_PASSWORD_HASH: z
    .string()
    .min(1, 'ADMIN_PASSWORD_HASH is required — generate one with: ' +
      'node -e "require(\'bcrypt\').hash(\'yourpassword\', 10).then(console.log)"'),
});

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(
      `\n\nMissing or invalid environment variables:\n${issues}\n\n` +
        'See api/.env.example for the full list and how to generate each value.\n',
    );
  }
  return result.data;
}
