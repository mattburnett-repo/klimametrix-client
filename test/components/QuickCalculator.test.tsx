import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuickCalculator from '../../src/components/QuickCalculator'
import { jest } from '@jest/globals'

jest.mock('../../src/services/api')

describe('QuickCalculator', () => {
  it('renders calculator form', () => {
    render(<QuickCalculator />)
    
    expect(screen.getByLabelText(/electricity usage/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/fuel consumption/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/waste generated/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('calculates emissions when form is submitted', async () => {
    render(<QuickCalculator />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/electricity usage/i), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByLabelText(/fuel consumption/i), {
      target: { value: '50' },
    })
    fireEvent.change(screen.getByLabelText(/waste generated/i), {
      target: { value: '25' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))

    // Check results are displayed
    expect(await screen.findByText(/total emissions/i)).toBeInTheDocument()
    expect(await screen.findByText(/electricity/i)).toBeInTheDocument()
    expect(await screen.findByText(/fuel/i)).toBeInTheDocument()
    expect(await screen.findByText(/waste/i)).toBeInTheDocument()
  })
}) 