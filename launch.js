const { exec } = require('child_process');

// run API
exec('dotnet run', { cwd: 'backend' }, (error) => {

    if (error) {
        console.error(`backend exec error ${error}`)
        return
    } 
})

// run npm install in frontend
exec('npm install', { cwd: 'frontend' }, (error) => {
    
    if (error) {
        console.error(`frontend npm install exec error ${error}`)
        return
    } 
})

// start frontend server
exec('npm start', { cwd: 'frontend' }, (error) => {
    
    if (error) {
        console.error(`frontend npm start exec error ${error}`)
        return
    } 
})

console.log('API running on https://localhost:5001/index.html')
console.log('Frontend running on http://localhost:3000')

