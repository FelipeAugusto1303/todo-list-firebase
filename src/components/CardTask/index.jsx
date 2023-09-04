import { ChevronDownIcon, ChevronUpIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { deleteTask, getUser, updateTask } from '../../services/firebaseService'
import { UserAuth } from '../../context/AuthContext'
import { onSnapshot } from 'firebase/firestore'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import EditTaskModal from '../EditTaskModal'

function CardTask({ taskData, listId, taskId, user }) {
  const { isOpen, onToggle } = useDisclosure()
  const [owner, setOwner] = useState(null)
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: closeModal } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    const queryUser = getUser(taskData.createBy)

    onSnapshot(queryUser, (querySnapshot) => {
      setOwner(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const blockTask = () => {
    updateTask(listId, taskId, {
      blocked: !taskData.blocked,
    })
      .then(() => {
        if (!taskData.blocked) {
          toast({
            title: 'Tarefa bloqueada',
            description:
              'A tarefa foi bloqueada, desbloqueie para outros colaboradores poderem atualiza-la.',
            status: 'info',
            duration: 9000,
            isClosable: true,
            position: 'top-center',
          })
        }
      })
      .catch((err) => {
        toast({
          title: 'Error na requisição',
          description: 'Houve um erro de requisição com o firebase',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        })
      })
  }

  const concludeTask = () => {
    if (!taskData.blocked || taskData.createBy === user.email) {
      updateTask(listId, taskId, {
        completed: !taskData.completed,
      })
        .then(() => {
          if (!taskData.completed) {
            toast({
              title: 'Tarefa completa',
              description: 'A tarefa foi completada com sucesso.',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top-center',
            })
          }
        })
        .catch((err) => {
          toast({
            title: 'Error na requisição',
            description: 'Houve um erro de requisição com o firebase',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-center',
          })
        })
    }
  }

  const eraseTask = () => {
    deleteTask(listId, taskId)
      .then(() => {
        toast({
          title: 'Tarefa deletada',
          description: 'A tarefa foi deletada com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        })
      })
      .catch((err) => {
        toast({
          title: 'Error na requisição',
          description: 'Houve um erro de requisição com o firebase',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        })
      })
  }

  const updateFieldsTask = (title, description) => {
    updateTask(listId, taskId, {
      completed: false,
      title: title,
      description: description,
    })
      .then(() => {
        toast({
          title: 'Tarefa atualizada',
          description: 'A tarefa foi atualizada com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        })
        closeModal()
      })
      .catch((err) => {
        toast({
          title: 'Error na requisição',
          description: 'Houve um erro de requisição com o firebase',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        })
      })
  }
  return (
    <>
      <Box
        w='100%'
        minH='50px'
        borderRadius='15px'
        display='flex'
        flexDirection='column'
        border='1px solid #ccc'
      >
        <Flex
          w='100%'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          p='10px'
        >
          <Heading as='h6' size='md' textDecoration={taskData.completed ? 'line-through' : 'none'}>
            {taskData.title}
          </Heading>
          <Flex alignItems='center' gap='20px'>
            <Flex alignItems='center' justifyContent='center' onClick={() => concludeTask()}>
              {taskData.completed ? (
                <CheckBoxIcon data-testid='completed-icon' />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </Flex>
            <Box data-testid='open-collapse' onClick={onToggle}>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Box>
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box w='100%' mt='10px' p='10px'>
            <Text>{taskData.description}</Text>
            <Divider mt='20px' />
            <Flex alignItems='center' gap='10px' mt='30px'>
              <Text>
                Criado em {format(new Date(taskData.createdAt.seconds * 1000), 'dd/MM/yyyy hh:mm')}
              </Text>
              <Flex alignItems='center' justifyContent='center' gap='10px'>
                <Text>Criado por:</Text>
                <Avatar
                  data-testid='card-avatar'
                  src={
                    owner !== null
                      ? owner[0].data.photoURL
                      : 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg'
                  }
                />
              </Flex>
            </Flex>
            <Box
              w='100%'
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent={user.email === taskData.createBy ? 'space-between' : 'flex-end'}
              mt='20px'
            >
              {user.email === taskData.createBy && (
                <Button
                  leftIcon={taskData.blocked ? <UnlockIcon /> : <LockIcon />}
                  colorScheme={taskData.blocked ? 'blue' : 'red'}
                  onClick={() => blockTask()}
                >
                  {taskData.blocked ? 'Desbloquear' : 'Bloquear'}
                </Button>
              )}
              <Box display='flex' alignItems='center' gap='20px'>
                <Button
                  colorScheme='blue'
                  variant='outline'
                  isDisabled={taskData.blocked && !(taskData.createBy === user.email)}
                  onClick={onOpenModal}
                >
                  Editar
                </Button>
                <Button
                  colorScheme='red'
                  isDisabled={taskData.blocked && !(taskData.createBy === user.email)}
                  onClick={() => eraseTask()}
                >
                  Excluir
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <EditTaskModal
        isOpen={isOpenModal}
        onClose={closeModal}
        handleUpdate={updateFieldsTask}
        oldTitle={taskData.title}
        oldDescription={taskData.description}
      />
    </>
  )
}

export default CardTask
