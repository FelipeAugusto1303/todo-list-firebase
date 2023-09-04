import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import CardTask from '.'
import { Timestamp } from 'firebase/firestore'
import { fireEvent } from '@testing-library/react'

describe('CardTask component', () => {
  beforeEach(() => {
    const taskDataMock = {
      blocked: false,
      completed: false,
      createBy: 'felipe.augusto.1303@gmail.com',
      title: 'titulo teste',
      description: 'descrição teste',
      createdAt: Timestamp.now(),
    }

    const userMock = { email: 'felipe.augusto.1303@gmail.com' }
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask
              taskData={taskDataMock}
              listId='GBXy1c6OJXQwcrlnjWgr'
              taskId='AmtaXGIEuG0hk15CmPdo'
              user={userMock}
            />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )
  })

  it('should render', () => {
    cy.contains('titulo teste').should('exist')
  })

  it('should conclude task', () => {
    cy.get('[data-testid="conclude-task"]').click()
    cy.contains('Tarefa completa').should('exist')
  })

  it('should open collapse', () => {
    cy.get('[data-testid="open-collapse"]').click()
    cy.contains('descrição teste').should('exist')
  })

  it('should block task', () => {
    cy.get('[data-testid="open-collapse"]').click()
    cy.contains('Bloquear').click()
    cy.contains('Tarefa bloqueada').should('exist')
  })

  it('should edit task', () => {
    cy.get('[data-testid="open-collapse"]').click()
    cy.contains('Editar').click()
    cy.contains('Edite a tarefa').should('exist')
    cy.get('input[name="task"]').type(' novo')
    cy.get('textarea[name="description"]').type(' novo lorem ipsum')

    cy.get('[data-testid="edit-button"]').click()

    cy.contains('Tarefa atualizada').should('exist')
  })

  it('should not edit', () => {
    const taskDataMock2 = {
      blocked: true,
      completed: false,
      createBy: 'felipe.augusto.1303@gmail.com',
      title: 'titulo teste',
      description: 'descrição teste',
      createdAt: Timestamp.now(),
    }

    const userMock2 = { email: 'felipe.1303@gmail.com' }
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask
              taskData={taskDataMock2}
              listId='GBXy1c6OJXQwcrlnjWgr'
              taskId='AmtaXGIEuG0hk15CmPdo'
              user={userMock2}
            />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    cy.get('[data-testid="open-collapse"]').click()
    cy.contains('Editar').should('be.disabled')
  })

  it('should not complete', () => {
    const taskDataMock2 = {
      blocked: true,
      completed: false,
      createBy: 'felipe.augusto.1303@gmail.com',
      title: 'titulo teste',
      description: 'descrição teste',
      createdAt: Timestamp.now(),
    }

    const userMock2 = { email: 'felipe.1303@gmail.com' }
    cy.mount(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask
              taskData={taskDataMock2}
              listId='GBXy1c6OJXQwcrlnjWgr'
              taskId='AmtaXGIEuG0hk15CmPdo'
              user={userMock2}
            />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    cy.get('[data-testid="conclude-task"]').click()
    cy.contains('Tarefa completa').should('not.exist')
  })
})
