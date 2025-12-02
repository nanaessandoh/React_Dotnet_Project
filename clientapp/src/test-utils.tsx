import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

type InitialQuery = {
    queryKey: readonly unknown[];
    data: unknown;
};

export function createTestQueryClient() {
    return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

export function renderWithClient(ui: React.ReactElement, options?: { initialQueries?: InitialQuery[] }) {
    const queryClient = createTestQueryClient();

    options?.initialQueries?.forEach((q) => {
        queryClient.setQueryData(q.queryKey, q.data);
    });

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>{children}</MemoryRouter>
        </QueryClientProvider>
    );

    return { ...render(ui, { wrapper }), queryClient };
}

export default renderWithClient;
