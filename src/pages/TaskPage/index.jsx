import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createTask, findAllTasks } from '../../services/firebaseService'
import { Timestamp, onSnapshot } from 'firebase/firestore'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import CardTask from '../../components/CardTask'

function TaskPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!location.state.listId) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const q = findAllTasks(location.state.listId)
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const handleCreateTask = () => {
    createTask(location.state.listId, {
      blocked: false,
      completed: false,
      createdAt: Timestamp.now(),
      createBy: 'felipe',
      title: 'titulo teste',
      description: 'descriçao teste',
    })
  }

  console.log(location.state.listId)
  return (
    <>
      <Flex align='center' justify='flex-start' direction='column'>
        <Header />
        {tasks === null || tasks.length === 0 ? (
          <Box
            h='500px'
            display='flex'
            flexDirection='column'
            align='center'
            justifyContent='center'
            marginTop='80px'
            marginBottom='50px'
            gap='5px'
          >
            <Heading as='h3' size='lg'>
              Oops.., Parece que você não está em nenhuma lista
            </Heading>
            <Heading as='h6' size='sm'>
              Clique no botão abaixo e crie sua lista de tarefas
            </Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme='teal'
              variant='outline'
              onClick={() => handleCreateTask()}
            >
              Crie uma nova tarefa
            </Button>
          </Box>
        ) : (
          <>
            <Box
              w='100%'
              display='flex'
              flexDirection='column'
              align='center'
              justifyContent='flex-start'
              marginTop='80px'
              marginBottom='50px'
              gap='20px'
            >
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.300' fontSize='20px' />
                </InputLeftElement>
                <Input
                  size='md'
                  placeholder='Busque uma tarefa'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Button
                leftIcon={<AddIcon />}
                colorScheme='teal'
                variant='outline'
                onClick={() => handleCreateTask()}
              >
                Crie uma nova tarefa
              </Button>
              <Divider orientation='horizontal' />
            </Box>
            {/* elemento de lista de elementos */}
            <Box display='flex' flexDirection='column' w='100%' gap='5px'>
              {tasks
                .filter((task) => task.data.title.toLowerCase().includes(search))
                .sort((a, b) => {
                  return (
                    new Date(b.data.createdAt.seconds * 1000) -
                    new Date(a.data.createdAt.seconds * 1000)
                  )
                })
                .map((task) => {
                  return <CardTask taskData={task.data} />
                })}
            </Box>
          </>
        )}
      </Flex>
    </>
  )
}

export default TaskPage
