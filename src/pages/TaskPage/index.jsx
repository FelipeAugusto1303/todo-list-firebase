import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findAllTasks } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'

// import { Container } from './styles';

function TaskPage() {
  const location = useLocation()
  const [tasks, setTasks] = useState(null)

  console.log('tasks criadas: ', tasks)

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

  console.log(location.state.listId)
  return <div>Task page</div>
}

export default TaskPage
