pipeline {
    agent any
    stages {
        stage('Pull from GitHub') {
            steps {
                git 'https://github.com/Dhouib-Mohamed/backend-learnroom.git'
            }
        }
        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build('nadamankai/learn-room:backend')
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com/', 'dockerhub-credentials-id') {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}