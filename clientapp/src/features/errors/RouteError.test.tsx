import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
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

describe('RouteError', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders error title and main heading', () => {
        const mockError = {
            status: 404,
            statusText: 'Not Found',
            data: { message: 'The page you requested does not exist.' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Oops!')).toBeInTheDocument()
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders route error with status code and status text', () => {
        const mockError = {
            status: 404,
            statusText: 'Not Found',
            data: { message: 'The page you requested does not exist.' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText(/Error 404/)).toBeInTheDocument()
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

    it('renders error data as JSON when message is not present', () => {
        const mockError = {
            status: 500,
            statusText: 'Internal Server Error',
            data: { error: 'Something broke', code: 'ERR_001' },
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText(/ERR_001/)).toBeInTheDocument()
    })

    it('renders generic error message for non-route errors', () => {
        const error = new Error('Runtime error occurred')
        vi.mocked(routerModule.useRouteError).mockReturnValue(error)

        renderWithClient(<RouteError />)

        expect(screen.getByText('Oops!')).toBeInTheDocument()
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

        const homeButton = screen.getByRole('link', { name: /Go Home/i })
        expect(homeButton).toHaveAttribute('href', '/')
    })

    it('renders refresh button', () => {
        const mockError = {
            status: 500,
            statusText: 'Internal Server Error',
            data: null,
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        const refreshButton = screen.getByRole('button', { name: /Refresh Page/i })
        expect(refreshButton).toBeInTheDocument()
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

    it('handles route error without data', () => {
        const mockError = {
            status: 403,
            statusText: 'Forbidden',
        }

        vi.mocked(routerModule.useRouteError).mockReturnValue(mockError)

        renderWithClient(<RouteError />)

        expect(screen.getByText(/Error 403/)).toBeInTheDocument()
        expect(screen.getByText('Forbidden')).toBeInTheDocument()
    })

    it('does not display stack trace button in production', () => {
        const error = new Error('Test error')
        vi.mocked(routerModule.useRouteError).mockReturnValue(error)

        // Set to production
        const originalEnv = import.meta.env.DEV
        Object.defineProperty(import.meta.env, 'DEV', { value: false, configurable: true })

        renderWithClient(<RouteError />)

        expect(screen.queryByText('Stack Trace')).not.toBeInTheDocument()

        // Restore
        Object.defineProperty(import.meta.env, 'DEV', { value: originalEnv, configurable: true })
    })
})
