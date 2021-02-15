console.log('app code start');

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const server = express();

const packageJson = JSON.parse(fs.readFileSync('package.json'));
const appName = packageJson.name;
const appVersion = packageJson.version;

server.use(cors({ exposedHeaders: 'Content-Length' }));
server.use(express.text());

server.get('/', (req, res) => res.send(`${appName} ${appVersion}`));
server.get('/app/name', (req, res) => res.send(appName));
server.get('/app/ver', (req, res) => res.send(appVersion));
server.get('/ping', (req, res) => res.send('pong'));
server.get('/args', (req, res) => res.send(process.argv));

let counter = 0;
server.get('/counter', (req, res) =>
{
    const c = (counter++).toString();
    console.log('counter:', c);
    res.send(c);
});

server.listen(7001, () => console.log(`${appName} ${appVersion} started`));

console.log('app code end');