const http = require('http');
const fs = require('fs');
const req = http.get('http://fs.w.kugou.com/201903291031/8de6755d3130fef2cdf40a83801bca07/G123/M01/13/1D/uw0DAFqox3OAWe0UAD_HxYp_Ivc469.mp3', (res) => {
    const writeStream = fs.createWriteStream('演员.mp3');
    res.pipe(writeStream);
})