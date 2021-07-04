const keys = {
    port: process.env.PORT,
    workerHost: process.env.WORKER_HOST,
    workerPort: process.env.WORKER_PORT,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
}


module.exports = { keys };