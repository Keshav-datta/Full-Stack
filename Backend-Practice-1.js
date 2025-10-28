//node.js

const express = require('express');
const app = express();
const PORT = 3000;

const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log([${timestamp}] ${req.method} ${req.url});
    next();
};

app.use(loggerMiddleware);

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (token === 'mysecrettoken') {
        next();
    } else {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

app.get('/public', (req, res) => {
    res.send('This is a public route, no token needed!');
});

app.get('/protected', authMiddleware, (req, res) => {
    res.send('Access granted! You provided the correct token.');
});

app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});
