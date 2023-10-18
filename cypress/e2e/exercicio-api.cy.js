/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
const { faker } = require('@faker-js/faker');

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let email = (faker.internet.email())
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": 'Gabriella',
                    "email": email,
                    "password": "Teste 123",
                    "administrador": "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario('Gabriella Gnoatto', 'gabgnoatto@qa.com.br', 'teste', 'true')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal('Já existe cadastro com esse email')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[1]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": "Gab Exercicio3",
                         "email": "gabexercicio3@ebac.com.br",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     });

     it.only('Deve deletar um usuário previamente cadastrado', () => {
          let email = (faker.internet.email())
          cy.cadastrarUsuario('Gabriella Gnoatto', email, 'teste', 'true')
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,

                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     })


});
