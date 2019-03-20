const createFakeHttpsWebSite = require('./createFakeHttpsWebSite')
createFakeHttpsWebSite('github.com', (port) => {
    console.log(port);
});