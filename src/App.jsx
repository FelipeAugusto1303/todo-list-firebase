import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createTask, findAllLists } from './services/firebaseService'
import { Timestamp, onSnapshot } from 'firebase/firestore'

function App() {
  const [count, setCount] = useState(0)
  const [task, setTask] = useState(null)

  console.log('tasks ===> ', task)

  const addTask = () => {
    createTask({
      title: 'titulo teste',
      description: 'descrição teste',
      completed: false,
      createdAt: Timestamp.now(),
    })
  }

  useEffect(() => {
    const q = findAllLists('user1')
    onSnapshot(q, (querySnapshot) => {
      setTask(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => addTask()}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
