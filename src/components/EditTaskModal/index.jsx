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

function EditTaskModal({ isOpen, onClose, handleUpdate, oldTitle, oldDescription }) {
  const initialRef = useRef(null)
  const [name, setName] = useState(oldTitle)
  const [description, setDescription] = useState(oldDescription)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edite a tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2} gap='10px'>
          <Input
            name='task'
            size='md'
            placeholder='Digite o titulo da tarefa'
            value={name}
            mb='10px'
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            name='description'
            placeholder='Faça uma breve descrição da atividade'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            data-testid='edit-button'
            colorScheme='blue'
            mr={3}
            disabled={name == '' || description === ''}
            onClick={() => handleUpdate(name, description)}
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

export default EditTaskModal
