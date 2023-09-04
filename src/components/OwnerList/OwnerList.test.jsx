import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import { expect } from 'vitest'
import OwnerList from '.'

describe('Owner list component', async () => {
  it('should render the owner list', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <OwnerList
            worker='felipe@email.com'
            setWorker={() => {}}
            listId='list_id'
            listUsers={['felipe@email.com']}
            setUpdateList={() => {}}
            listCreator='Felipe'
          />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('owner-list')).toBeInTheDocument()
  })

  it('should input work', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <OwnerList
            worker='felipe@email.com'
            setWorker={() => {}}
            listId='list_id'
            listUsers={['felipe@email.com']}
            setUpdateList={() => {}}
            listCreator='Felipe'
          />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const inputElement = screen.getByTestId('owner-input')

    expect(inputElement.value).toBe('felipe@email.com')
  })

  it('should have add button', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <OwnerList
            worker='felipe@email.com'
            setWorker={() => {}}
            listId='list_id'
            listUsers={['felipe@email.com']}
            setUpdateList={() => {}}
            listCreator='Felipe'
          />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('Adicionar')).toBeInTheDocument()
  })
})
