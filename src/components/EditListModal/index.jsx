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

function EditListModal({ isOpen, onClose, handleEdit, title }) {
  const initialRef = useRef(null)
  const [name, setName] = useState(title)
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edite a lista</ModalHeader>
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
            data-testid='button-edit'
            colorScheme='teal'
            mr={3}
            onClick={() => handleEdit(name)}
          >
            Editar
          </Button>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditListModal
