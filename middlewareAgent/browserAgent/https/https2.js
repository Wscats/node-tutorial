// curl -k https://localhost:8000/
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../../CA/rootCA/rootCA.key.pem'),
  cert: fs.readFileSync('../../CA/rootCA/rootCA.crt')
};

https.createServer(options, (req, res) => {
  console.log(req.url);
  res.writeHead(200);
  res.end('hello world\n');
}).listen(6789);