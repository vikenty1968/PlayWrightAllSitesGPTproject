pipeline{
    agent{
      docker{
        image 'mcr.microsoft.com/playwright:v1.64.1-noble'
         }
    }
    environment{
        
  CI = 'true'
    BASE_URL = 'https://rahulshettyacademy.com/client/'

    TEST_EMAIL = credentials('TEST_EMAIL')
    TEST_PASSWORD = credentials('TEST_PASSWORD')

    EVENTHUB_EMAIL = credentials('EVENTHUB_EMAIL')
    EVENTHUB_PASSWORD = credentials('EVENTHUB_PASSWORD')

    }
    stages{
         stage('Install dependencies'){
            steps{
              sh 'npm ci'
            }
         }
         stage('Test'){
            steps{
                sh'npx playwright test'
            }
         }

    }
    post{
            always {
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**',
                             allowEmptyArchive: true
        }
    }
}