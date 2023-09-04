import React from 'react'
import CardList from './index'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../context/AuthContext'
import { Timestamp } from 'firebase/firestore'

describe('Tests in Card List component', () => {
  const listDataMock = {
    email: 'felipe.augusto.1303@gmail.com',
    createdBy: 'felipe.augusto.1303@gmail.com',
    name: 'Felipe Augusto',
    users: ['felipe.augusto.1303@gmail.com'],
    createdAt: Timestamp.now(),
  }
  const listIdMock = ''
  const userMock = { email: 'felipe.augusto.1303@gmail.com' }

  it('should renders', () => {
    // see: https://on.cypress.io/mounting-react

    cy.mount(
      <BrowserRouter>
        <AuthContextProvider>
          <CardList listData={listDataMock} listId={listIdMock} user={userMock} />
        </AuthContextProvider>
      </BrowserRouter>
    )
  })
})
