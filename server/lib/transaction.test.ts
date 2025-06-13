import { Prisma } from '@prisma/client';
import { expect, test, vi } from 'vitest';
import { transaction } from './transaction';

declare const mockPrismaPromiseNumber: Prisma.PrismaPromise<number>;
declare const mockPrismaPromiseUnknown: Prisma.PrismaPromise<unknown>;

const mockTransactionClient: Prisma.TransactionClient = {
  $executeRaw(_query: TemplateStringsArray | Prisma.Sql): Prisma.PrismaPromise<number> {
    return mockPrismaPromiseNumber;
  },
  $executeRawUnsafe(_query: string): Prisma.PrismaPromise<number> {
    return mockPrismaPromiseNumber;
  },
  $queryRaw<T = unknown>(_query: TemplateStringsArray | Prisma.Sql): Prisma.PrismaPromise<T> {
    return mockPrismaPromiseUnknown as Prisma.PrismaPromise<T>;
  },
  $queryRawUnsafe<T = unknown>(_query: string): Prisma.PrismaPromise<T> {
    return mockPrismaPromiseUnknown as Prisma.PrismaPromise<T>;
  },
};

vi.mock('./prismaClient', function () {
  return {
    prismaClient: {
      $transaction(
        fn: (tx: Prisma.TransactionClient) => Promise<unknown>,
        _options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
      ): Promise<unknown> {
        return fn(mockTransactionClient);
      },
    },
  };
});

const fn = vi.fn(function (_tx: Prisma.TransactionClient): Promise<unknown> {
  return Promise.reject(
    new Prisma.PrismaClientKnownRequestError('Test error', {
      code: 'P2028',
      clientVersion: '1.0.0',
    }),
  );
});
const fn2 = vi.fn(function (_tx: Prisma.TransactionClient): Promise<unknown> {
  return Promise.resolve('success');
});

test('transaction', async () => {
  await transaction('RepeatableRead', fn, 3).catch((e) => {
    expect(e).toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    expect(fn).toHaveBeenCalledTimes(3 + 1); // 3 retries + initial call
  });
  await transaction('RepeatableRead', fn2, 3);
  expect(fn2).toHaveBeenCalledTimes(1);
});
