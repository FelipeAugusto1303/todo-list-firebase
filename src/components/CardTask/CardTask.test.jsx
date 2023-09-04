import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Timestamp } from 'firebase/firestore'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import { expect } from 'vitest'
import CardTask from '.'
import { format } from 'date-fns'
import { ChakraProvider } from '@chakra-ui/react'

describe('CardTask', async () => {
  const taskDataMock = {
    blocked: false,
    completed: true,
    createdAt: Timestamp.now(),
    createBy: 'felipe.augusto.1303@gmail.com',
    title: 'titulo teste',
    description: 'descrição teste',
  }
  const listIdMock = ''
  const userMock = { email: 'felipe.augusto.1303@gmail.com' }

  it('should render the Card Task', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('titulo teste')).toBeInTheDocument()
  })

  it('should title line-through when Card completed', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('titulo teste')).toHaveStyle('text-decoration: line-through')
  })

  it('should have correct icon when card completed', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('completed-icon')).toBeInTheDocument()
  })

  it('should open card collapse', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(screen.getByText('descrição teste')).toBeInTheDocument()
  })

  it('should have corrected date', () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(
      screen.getByText(
        `Criado em ${format(new Date(taskDataMock.createdAt.seconds * 1000), 'dd/MM/yyyy hh:mm')}`
      )
    ).toBeInTheDocument()
  })

  it('should have avatar in Card', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)
    expect(screen.getByTestId('card-avatar')).toBeInTheDocument()
  })
  it('should have block button', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(screen.getByText('Bloquear')).toBeInTheDocument()
  })

  it('should not have block button', () => {
    const taskDataMock2 = taskDataMock
    taskDataMock2.createBy = 'teste@email.com'
    render(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask taskData={taskDataMock2} listId={listIdMock} taskId='' user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(screen.queryByText('Bloquear')).toBeNull()
  })

  it('should have edit button', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(screen.getByText('Editar')).toBeInTheDocument()
  })

  it('should have remove button', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <AuthContextProvider>
            <CardTask taskData={taskDataMock} listId={listIdMock} taskId='' user={userMock} />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    const button = screen.getByTestId('open-collapse')

    fireEvent.click(button)

    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })
})
