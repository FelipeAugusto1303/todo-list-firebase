import { Timestamp } from 'firebase/firestore'
import CreateListModal from '.'
import { createList } from '../../services/firebaseService'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from '../../context/AuthContext'

describe('tests in create list modal', () => {
  const body = {
    name: 'Teste cypress',
    createdBy: 'felipe.augusto.1303@gmail.com',
    users: ['felipe.augusto.1303@gmail.com'],
    createdAt: Timestamp.now(),
  }
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CreateListModal
              isOpen={true}
              onClose={() => {}}
              handleCreate={() => createList(body)}
            />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )
  })

  it('should renders', () => {
    cy.contains('Crie uma nova lista').should('exist')
  })

  it('should create a list', () => {
    cy.get('[data-testid="create-input"]').type('Felipe cypress')
    cy.contains('Criar').click()
    cy.get('[data-testid="create-input"]').should('have.value', '')
  })
})
