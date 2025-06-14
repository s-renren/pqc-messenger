import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Home from './page';

describe('app', () => {
  test('ホームが表示されている', async () => {
    render(<Home />);

    expect(screen.getByText('pqc-messenger')).toBeInTheDocument();
    expect(screen.getByText('クリックされていません')).toBeInTheDocument();

    const sendButton = screen.getByRole('button');
    expect(screen.getByRole('button')).toHaveTextContent('ボタン');

    sendButton.click();
    expect(await screen.findByText('クリックされました')).toBeInTheDocument();
  });
});
