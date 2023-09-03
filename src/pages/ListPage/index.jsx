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
import CardList from '../../components/CardList'
import Header from '../../components/Header'
import { UserAuth } from '../../context/AuthContext'
import ListSkeleton from '../../components/ListSkeleton'

function ListPage() {
  const [list, setList] = useState(null)
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = UserAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user !== null) {
      const q = findAllLists(user.email)
      onSnapshot(q, (querySnapshot) => {
        setList(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
        setIsLoading(false)
      })
    }
  }, [user])

  const handleCreateList = (name) => {
    const body = {
      name: name,
      createdBy: user.email,
      users: [user.email],
      createdAt: Timestamp.now(),
    }
    createList(body)
    onClose()
  }

  return (
    user && (
      <>
        <Flex align='center' justify='flex-start' direction='column'>
          <Header />
          {isLoading ? (
            <ListSkeleton />
          ) : list === null || list.length === 0 ? (
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
              <Button leftIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={onOpen}>
                Crie uma nova Lista
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
                    placeholder='Busque uma lista'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme='teal'
                  variant='outline'
                  onClick={onOpen}
                >
                  Crie uma nova Lista
                </Button>
                <Divider orientation='horizontal' />
              </Box>
              {/* elemento de lista de elementos */}
              <Box display='flex' flexDirection='row' flexWrap='wrap' gap='5px'>
                {list
                  .filter((l) => l.data.name.toLowerCase().includes(search))
                  .sort((a, b) => {
                    return (
                      new Date(b.data.createdAt.seconds * 1000) -
                      new Date(a.data.createdAt.seconds * 1000)
                    )
                  })
                  .map((l) => {
                    return <CardList key={l.id} listId={l.id} listData={l.data} />
                  })}
              </Box>
            </>
          )}
        </Flex>
        <CreateListModal isOpen={isOpen} onClose={onClose} handleCreate={handleCreateList} />
      </>
    )
  )
}

export default ListPage
