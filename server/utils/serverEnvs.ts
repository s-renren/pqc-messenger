import { config } from 'dotenv';
import { z } from 'zod';

config();
type ENV_VALUE_TYPE = 'test' | 'development' | 'production' | 'cli';

export function envParser(env?: string): ENV_VALUE_TYPE {
  return z.enum(['test', 'development', 'production', 'cli']).default('cli').parse(env);
}

const NODE_ENV = envParser(process.env.NODE_ENV);

export { NODE_ENV };
