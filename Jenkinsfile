pipeline {
    agent any

    stages{
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/alleirbagg/teste-api-cy.git'
            }
        }

        stage ('Instalar dependencias'){
            steps {
                sh 'npm install --force'
            }
        }

        stage ('Executar Testes'){
            steps {
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }

}