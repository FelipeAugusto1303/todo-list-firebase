import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import CardList from '.'
import { expect } from 'vitest'
import { format } from 'date-fns'

describe('CardList', async () => {
  const listDataMock = {
    email: 'felipe.augusto.1303@gmail.com',
    createdBy: 'felipe.augusto.1303@gmail.com',
    name: 'Felipe Augusto',
    users: ['felipe.augusto.1303@gmail.com'],
    createdAt: Timestamp.now(),
  }
  const listIdMock = ''
  const userMock = { email: 'felipe.augusto.1303@gmail.com' }

  it('should render the Card List', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('Felipe Augusto')).toBeInTheDocument()
  })

  it('should card have correct sizes', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )
    expect(screen.getByTestId('chakra-card')).toHaveStyle('width: 400px')
    expect(screen.getByTestId('chakra-card')).toHaveStyle('height: 250px')
    expect(screen.getByTestId('chakra-card')).toHaveStyle('border: 1px solid #000')
  })
  it('should have button to access the list', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )
    expect(screen.getByText('Acessar Lista')).toBeInTheDocument()
  })

  it('should go to task page', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const button = screen.getByText('Acessar Lista')
    fireEvent.click(button)

    expect(window.location.pathname).toBe('/todo-list-firebase/task')
  })
})
