import { config } from 'dotenv';
import { z } from 'zod';

config();
export function envParser(env?: string): 'test' | 'development' | 'production' | 'cli' {
  return z.enum(['test', 'development', 'production', 'cli']).default('cli').parse(env);
}

const NODE_ENV = envParser(process.env.NODE_ENV);

export { NODE_ENV };
