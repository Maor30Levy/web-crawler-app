const express = require('express');
const cors = require('cors');
const { keys } = require('./keys/keys');
const redisClient = require('./redis/redis-connect');
redisClient.on("ready", function () {
    console.log('Redis client connected');
});
const app = express();
app.use(express.json());
app.use(cors());
const port = keys.port;
const clientRouter = require('./routers/clientRouter');
app.use(clientRouter);
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
});