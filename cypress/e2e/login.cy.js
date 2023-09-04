describe('Login page', () => {
  const url =
    'https://tododb-fb718.firebaseapp.com/__/auth/handler?state=AMbdmDnjECMHQkjR3QpeCz1Zrjhm2NhQnKrFt5zxjrSzwhFkXUecUgNB1Y2f78TMYfFCQK7xQ-RGSnyVn9LB8eKCWV464CHMFJX7b_aUqtehIP3uODLC5jh9Yqaexqn03wn7d1W5KRq1GD2S3oGs1_sm7nIzjb-o44ebXtNFCfisrww2YGh4CAEt2tNNswFljfJeQt0XjJd28h-n_FeSZlr-5whlj5Ul6Pa-5IErtRmm5aA4Rgl-oMN_opWMhSw1KShY__iNkg-kNCBLLYMBvrvF1_ngPxmba9bSDRTDvbYzwjYhBK0keOB9Gc_tp9W9xsmgy3PsKA&code=4%2F0Adeu5BW6vsp8HTICAQma6S3yfMVLJnFKcCTi6Q0O05IhANI7tP_mRzsxq-uYJYpKUT0lDw&scope=email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none'
  it('should renders', () => {
    cy.visit('http://localhost:5173/todo-list-firebase/')
  })
  it('should have title', () => {
    cy.visit('http://localhost:5173/todo-list-firebase/')
    cy.contains('FireTask')
  })
  it('should have subtitle', () => {
    cy.visit('http://localhost:5173/todo-list-firebase/')
    cy.contains('Faça o login com sua conta Google para continuar.')
  })
  it('should have button', () => {
    cy.visit('http://localhost:5173/todo-list-firebase/')
    cy.contains('Login com Google')
  })
  it('should login', () => {
    cy.visit('http://localhost:5173/todo-list-firebase/')
    cy.contains('Login com Google').click()
  })
})
