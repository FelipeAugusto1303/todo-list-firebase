import '@testing-library/jest-dom'
import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import CardList from '.'
import { expect } from 'vitest'
import { format } from 'date-fns'
import Header from '.'

describe('Header component', async () => {
  const userMock = {
    email: 'felipe.augusto.1303@gmail.com',
    displayName: 'Felipe',
    photoURL: 'image_url',
  }

  it('should render the Header', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('FireTask')).toBeInTheDocument()
  })

  it('should have go back', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('back-icon')).toBeInTheDocument()
  })

  it('should have profile image', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByRole('img')).toHaveAttribute('src', userMock.photoURL)
  })

  it('should open profile menu', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const element = screen.getByTestId('profile-image')

    fireEvent.click(element)

    expect(screen.getByText(`Olá, ${userMock.displayName}`)).toBeInTheDocument()
  })

  it('should have profile image in menu', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const element = screen.getByTestId('profile-image')

    fireEvent.click(element)

    expect(screen.getByTestId('menu-profile-image')).toBeInTheDocument()
  })

  it('should menu profile image have correct properties', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const element = screen.getByTestId('profile-image')

    fireEvent.click(element)

    expect(screen.getByTestId('menu-profile-image')).toHaveStyle('border-radius: 100px')
    expect(screen.getByTestId('menu-profile-image')).toHaveStyle('margin-top: 20px')
    expect(screen.getByTestId('menu-profile-image')).toHaveStyle('width: 100px')
  })

  it('should menu profile have logout button', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const element = screen.getByTestId('profile-image')

    fireEvent.click(element)

    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should logout', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <Header user={userMock} goback />
        </AuthContextProvider>
      </BrowserRouter>
    )
    const element = screen.getByTestId('profile-image')

    fireEvent.click(element)

    const button = screen.getByText('Sair')

    fireEvent.click(button)

    expect(window.location.pathname).toBe('/')
  })
})
