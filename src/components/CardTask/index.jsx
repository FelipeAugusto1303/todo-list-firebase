import { LockIcon, NotAllowedIcon, UnlockIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { getUser, updateTask } from '../../services/firebaseService'
import { UserAuth } from '../../context/AuthContext'
import { onSnapshot } from 'firebase/firestore'

function CardTask({ taskData, listId, taskId }) {
  const { isOpen, onToggle } = useDisclosure()
  const { user } = UserAuth()
  const [owner, setOwner] = useState(null)

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
  }

  const concludeTask = () => {
    updateTask(listId, taskId, {
      completed: !taskData.completed,
    })
  }
  return (
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
        onClick={onToggle}
      >
        <Heading as='h6' size='md' textDecoration={taskData.completed ? 'line-through' : 'none'}>
          {taskData.title}
        </Heading>
        <Flex alignItems='center' gap='20px'>
          <Text>
            Criado em {format(new Date(taskData.createdAt.seconds * 1000), 'dd/MM/yyyy hh:mm')}
          </Text>
          <Flex alignItems='center' justifyContent='center' gap='10px'>
            <Text>Criado por:</Text>
            <Avatar
              src={
                owner !== null
                  ? owner[0].data.photoURL
                  : 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg'
              }
            />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box w='100%' mt='10px' p='10px'>
          <Text>{taskData.description}</Text>
          <Box
            w='100%'
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            mt='20px'
          >
            {user.email === taskData.createBy && (
              <Button
                leftIcon={taskData.blocked ? <UnlockIcon /> : <LockIcon />}
                colorScheme={taskData.blocked ? 'blue' : 'red'}
                onClick={() => blockTask()}
              >
                {taskData.blocked ? 'Desbolquear' : 'Bloquear'}
              </Button>
            )}
            <Box display='flex' alignItems='center' gap='20px'>
              <Button
                colorScheme='teal'
                variant='outline'
                isDisabled={taskData.blocked}
                onClick={() => concludeTask()}
              >
                Concluir
              </Button>
              <Button colorScheme='blue' variant='outline' isDisabled={taskData.blocked}>
                Editar
              </Button>
              <Button colorScheme='red' isDisabled={taskData.blocked}>
                Excluir
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default CardTask
