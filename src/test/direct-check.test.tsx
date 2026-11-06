import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
const { check } = vi.hoisted(() => ({ check: vi.fn() }));
vi.mock('@tanstack/react-start', () => ({ useServerFn: () => check }));
vi.mock('@/lib/deep-check.functions', () => ({ deepCheck: vi.fn() }));
vi.mock('@tanstack/react-router', () => ({ createFileRoute: () => () => ({}), Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock('@/lib/i18n', () => ({ useLang: () => ({ lang: 'en', t: (value: { en: string }) => value.en }) }));
import { CheckPage } from '@/routes/check';
afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe('Direct AI assessment', () => {
  it('sends typed text straight to AI and returns its next steps', async () => {
    check.mockResolvedValue({ category: 'bullying', summary: 'Appearance-based harassment.', warningSigns: ['Body shaming'], nextSteps: ['Save the message and report the post.'], immediateDanger: false, risk: 'Medium' });
    render(<CheckPage />);
    fireEvent.change(screen.getByLabelText('Message, link or username'), { target: { value: 'They mocked my body online' } });
    expect(check).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Check text' }));
    await waitFor(() => expect(check).toHaveBeenCalledExactlyOnceWith({ data: { text: 'They mocked my body online', lang: 'en' } }));
    expect(await screen.findByText('Save the message and report the post.')).toBeInTheDocument();
    expect(screen.queryByText('Warning signs found')).not.toBeInTheDocument();
    expect(screen.queryByText(/AI can be wrong/)).not.toBeInTheDocument();
    const heading = await screen.findByText('Numbers you can contact now (free)');
    const hrefs = Array.from(heading.closest('div')?.querySelectorAll('a') ?? []).map((a) => a.getAttribute('href'));
    expect(hrefs[0]).toBe('tel:0774112233');
  });
  it('keeps the input available after AI fails', async () => {
    check.mockResolvedValue({ error: 'credits' });
    render(<CheckPage />);
    fireEvent.change(screen.getByLabelText('Message, link or username'), { target: { value: 'Help me understand this message' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check text' }));
    await screen.findByRole('alert');
    expect(screen.getByLabelText('Message, link or username')).toHaveValue('Help me understand this message');
    expect(screen.getByRole('button', { name: 'Check text' })).toBeEnabled();
  });
});
