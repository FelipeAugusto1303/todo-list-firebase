import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import ListPage from './pages/ListPage/index.jsx'
import TaskPage from './pages/TaskPage'

const router = createBrowserRouter([
  {
    path: '/todo-list-firebase/',
    element: <ListPage />,
  },
  {
    path: '/todo-list-firebase/task',
    element: <TaskPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
