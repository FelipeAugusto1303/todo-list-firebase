import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addUsersToList,
  createTask,
  findAllLists,
  findAllTasks,
} from '../../services/firebaseService'
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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import CardTask from '../../components/CardTask'
import CreateTaskModal from '../../components/CreateTaskModal'
import { UserAuth } from '../../context/AuthContext'

function TaskPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(null)
  const [search, setSearch] = useState('')
  const [listUsers, setListUsers] = useState([])
  const [updateList, setUpdateList] = useState(false)
  const [worker, setWorker] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = UserAuth()

  useEffect(() => {
    if (!location.state.listId) {
      navigate('/todo-list-firebase/list')
    }
  }, [])

  useEffect(() => {
    const q = findAllLists(user.email)
    onSnapshot(q, (querySnapshot) => {
      setListUsers(
        ...querySnapshot.docs
          .filter((doc) => doc.id === location.state.listId)
          .map((doc) => doc.data().users)
      )
    })
  }, [updateList])

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

  const handleCreateTask = (title, description) => {
    createTask(location.state.listId, {
      blocked: false,
      completed: false,
      createdAt: Timestamp.now(),
      createBy: user.email,
      title: title,
      description: description,
    })
    onClose()
  }

  const handleAddUser = () => {
    addUsersToList(location.state.listId, {
      users: [...listUsers, worker],
    })
    setWorker('')
    setUpdateList((prev) => !prev)
  }

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
            gap='15px'
          >
            <Heading as='h3' size='lg'>
              Oops.., Parece que você não tem nenhuma tarefa
            </Heading>
            <Text>Clique no botão abaixo e crie sua lista de tarefas</Text>
            <Button leftIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={onOpen}>
              Crie uma nova tarefa
            </Button>
          </Box>
        ) : (
          <>
            <Box
              w='100%'
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
            >
              <Input
                size='md'
                placeholder='adicione outros colaboradores a lista'
                value={worker}
                onChange={(e) => setWorker(e.target.value)}
              />
              <Button colorScheme='teal' leftIcon={<AddIcon />} onClick={() => handleAddUser()}>
                Adicionar
              </Button>
            </Box>
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
              <Button leftIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={onOpen}>
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
      <CreateTaskModal isOpen={isOpen} onClose={onClose} handleCreate={handleCreateTask} />
    </>
  )
}

export default TaskPage
