import React from 'react'
import CardList from './index'

describe('Tests on card list component', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CardList />)
  })
})
