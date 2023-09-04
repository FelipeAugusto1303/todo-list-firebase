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
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

function CreateListModal({ isOpen, onClose, handleCreate }) {
  const initialRef = useRef(null)
  const [name, setName] = useState('')

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crie uma nova lista</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <Input
            size='md'
            placeholder='Digite o nome da lista'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            mr={3}
            onClick={() => {
              handleCreate(name)
              setName('')
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

export default CreateListModal
