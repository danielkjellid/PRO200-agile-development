const { exec } = require('child_process');

// run API
const runAPI = () => {
    exec('dotnet run', { cwd: 'backend' }, (error) => {
        if (error) {
            console.error(`backend exec error ${error}`)
            return
        } 
    })
}

// run npm install in frontend
const installDependencies = () => {
    exec('npm install', { cwd: 'frontend' }, (error) => {
        if (error) {
            console.error(`frontend npm install exec error ${error}`)
            return
        } 
    })
}

// start frontend server
const runFrontend = async () => {

    await installDependencies()

    exec('npm start', { cwd: 'frontend' }, (error) => {
        if (error) {
            console.error(`frontend npm start exec error ${error}`)
            return
        } 
    })
}

const run = async () => {

    try {
        await runAPI()
        await runFrontend()

        console.log('API running on https://localhost:5001/index.html')
        console.log('Frontend running on http://localhost:3000/')
        
    } catch (error){
        console.error(error)
    }
}

run()

