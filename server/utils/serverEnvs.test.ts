import { describe, expect, test } from 'vitest';
import { envParser } from './serverEnvs';

describe('envParser', () => {
  test('undefinedの時はcliを返す', () => {
    expect(envParser(undefined)).toBe('cli');
  });

  test('testの時はtestを返す', () => {
    expect(envParser('test')).toBe('test');
  });

  test('developmentの時はdevelopmentを返す', () => {
    expect(envParser('development')).toBe('development');
  });

  test('productionの時はproductionを返す', () => {
    expect(envParser('production')).toBe('production');
  });

  test('cliの時はcliを返す', () => {
    expect(envParser('cli')).toBe('cli');
  });

  test('期待されていない値の時はエラーを投げる', () => {
    expect(() => envParser('hoge')).toThrow(/Invalid enum value/);
  });
});
