import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

// import { Container } from './styles';

function CreateTaskModal({ isOpen, onClose, handleCreate }) {
  const initialRef = useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crie uma nova tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2} gap='10px'>
          <Input
            size='md'
            placeholder='Digite o titulo da tarefa'
            value={name}
            mb='10px'
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder='Faça uma breve descrição da atividade'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            mr={3}
            disabled={name === '' || description === ''}
            onClick={() => {
              handleCreate(name, description)
              setName('')
              setDescription('')
            }}
          >
            Criar
          </Button>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateTaskModal
