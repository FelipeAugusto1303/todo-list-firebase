import React, { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
  Divider,
  useDisclosure,
} from '@chakra-ui/react'
import { createList, findAllLists } from '../../services/firebaseService'
import { Timestamp, onSnapshot } from 'firebase/firestore'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import CreateListModal from '../../components/CreateListModal'

function ListPage() {
  const [list, setList] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log('listas encontradas: ', list)

  useEffect(() => {
    const q = findAllLists('felipe')
    onSnapshot(q, (querySnapshot) => {
      setList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const handleCreateList = (name) => {
    const body = {
      name: name,
      createdBy: 'felipe',
      users: ['felipe'],
      createdAt: Timestamp.now(),
    }
    createList(body)
    onClose()
  }

  return (
    <>
      <Flex align='center' justify='flex-start' direction='column'>
        <Heading as='h2' size='2xl'>
          FireTask
        </Heading>
        {list === null || list.length === 0 ? (
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
              Parece que você não está em nenhuma lista
            </Heading>
            <Heading as='h6' size='sm'>
              Clique no botão abaixo e crie sua lista
            </Heading>
            <IconButton colorScheme='teal' icon={<AddIcon />} onClick={() => handleCreateList()} />
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
                <Input size='md' placeholder='Busque uma lista' />
              </InputGroup>
              <Button leftIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={onOpen}>
                Crie uma nova Lista
              </Button>
              <Divider orientation='horizontal' />
            </Box>
            {/* elemento de lista de elementos */}
          </>
        )}
      </Flex>
      <CreateListModal isOpen={isOpen} onClose={onClose} handleCreate={handleCreateList} />
    </>
  )
}

export default ListPage
