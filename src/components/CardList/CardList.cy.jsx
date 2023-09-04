import React from 'react'
import CardList from './index'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import { Timestamp } from 'firebase/firestore'
import { ChakraProvider } from '@chakra-ui/react'

describe('Tests in Card List component', () => {
  beforeEach(() => {
    const listDataMock = {
      createdBy: 'felipe.augusto.1303@gmail.com',
      name: 'tarefa',
      users: ['felipe.augusto.1303@gmail.com'],
      createdAt: Timestamp.now(),
    }
    const listIdMock = 'T5u1p12TFN9MlKFw3FFT'
    const userMock = { email: 'felipe.augusto.1303@gmail.com' }
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )
  })

  it('should renders', () => {
    cy.contains('Editar').click()

    cy.get('input').type(' nova')

    cy.get('[data-testid="button-edit"]').click()

    cy.contains('Acessar Lista').click()
    cy.url().should('include', '/todo-list-firebase/task')
  })

  // it('should remove', () => {
  //   cy.contains('Excluir').click()
  // })
})
