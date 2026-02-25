import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import * as routerModule from 'react-router'
import RouteError from './RouteError'
import renderWithClient from '../../test-utils'

// Mock react-router's useRouteError
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useRouteError: vi.fn(),
    }
})

// Mock for isRouteErrorResponse to properly identify route errors
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useRouteError: vi.fn(),
        isRouteErrorResponse: (error: unknown): error is { status: number; statusText: string; data?: unknown } => {
            return (
                typeof error === 'object' &&
                error !== null &&
                'status' in error &&
                'statusText' in error
            )
        },
    }
})

describe('RouteError', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders error heading', () => {
        const mockError = {
            status: 404,
            statusText: 'Not Found',
            data: { message: 'The page you requested does not exist.' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    })

    it('renders route error with status code', () => {
        const mockError = {
            status: 404,
            statusText: 'Not Found',
            data: { message: 'Page not found' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Error 404')).toBeInTheDocument()
        expect(screen.getByText('Not Found')).toBeInTheDocument()
    })

    it('renders error message from data', () => {
        const mockError = {
            status: 500,
            statusText: 'Internal Server Error',
            data: { message: 'Database connection failed' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Database connection failed')).toBeInTheDocument()
    })

    it('renders generic error message for non-route errors', () => {
        const error = new Error('Runtime error occurred')
        vi.mocked(routerModule.useRouteError).mockReturnValue(error)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
        expect(screen.getByText('Runtime error occurred')).toBeInTheDocument()
    })

    it('renders home button with correct link', () => {
        const mockError = {
            status: 404,
            statusText: 'Not Found',
            data: null,
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        const homeButton = screen.getByText(/Go Home/i)
        expect(homeButton).toBeInTheDocument()
        expect(homeButton.closest('a')).toHaveAttribute('href', '/')
    })

    it('renders refresh button', () => {
        const mockError = {
            status: 500,
            statusText: 'Internal Server Error',
            data: null,
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        const refreshButton = screen.getByText(/Refresh Page/i)
        expect(refreshButton).toBeInTheDocument()
        expect(refreshButton.tagName).toBe('BUTTON')
    })

    it('renders helpful message', () => {
        const mockError = {
            status: 503,
            statusText: 'Service Unavailable',
            data: null,
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(
            screen.getByText(/If this problem persists, please contact support/)
        ).toBeInTheDocument()
    })

    it('handles route error with 403 status', () => {
        const mockError = {
            status: 403,
            statusText: 'Forbidden',
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Error 403')).toBeInTheDocument()
        expect(screen.getByText('Forbidden')).toBeInTheDocument()
    })
})
