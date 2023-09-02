import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import ListPage from './pages/ListPage/index.jsx'
import TaskPage from './pages/TaskPage'
import LoginPage from './pages/LoginPage'
import Protected from './components/Protected'
import { AuthContextProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: '/todo-list-firebase/',
    element: <LoginPage />,
  },
  {
    path: '/todo-list-firebase/list',
    element: (
      <Protected>
        <ListPage />
      </Protected>
    ),
  },
  {
    path: '/todo-list-firebase/task',
    element: (
      <Protected>
        <TaskPage />
      </Protected>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)
