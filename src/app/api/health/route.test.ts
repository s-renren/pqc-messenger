import { describe, expect, it } from 'vitest';
import { $fc } from './frourio.client';

describe('GET /api/health', async () => {
  it('success', async () => {
    const res = await $fc().$get();

    expect(res).toEqual('ok');
  });

  // TODO:
  // it('error', async () => {
  //   vi.mock('server/lib/prismaClient', () => ({
  //     prismaClient: {
  //       $queryRaw: vi.fn().mockRejectedValue(new Error('DB connection failed')),
  //     },
  //   }));

  //   await expect($fc().$get()).rejects.toThrowError(/DB DB connection failed/);
  // });
});
