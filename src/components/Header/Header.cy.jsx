import { BrowserRouter } from 'react-router-dom'
import Header from '.'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from '../../context/AuthContext'

describe('Header component', () => {
  beforeEach(() => {
    const userMock = {
      email: 'felipe.augusto.1303@gmail.com',
      name: 'Felipe Augusto',
      photoURL: 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg',
    }
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <Header user={userMock} goback />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )
  })

  it('should renders', () => {
    cy.contains('FireTask').should('exist')
  })

  it('should open profile menu', () => {
    cy.get('[data-testid="profile-image"]').click()
    cy.contains('Olá').should('exist')
  })

  it('should logout', () => {
    cy.get('[data-testid="profile-image"]').click()
    cy.contains('Sair').click()
    cy.url().should('include', '/todo-list-firebase/')
  })
})
