const axios = require('axios');
const { createQueueAndMessage } = require('./queryHandler');
const { keys } = require('../keys/keys');

const initiateQuery = async (request) => {
    try {
        request.id = '0';
        request.level = '1';
        request.nodesInLevel = '1';
        request.currentNodeInLevel = '1';
        const queueName = request.qName;
        const { messageID, queueURL } = await createQueueAndMessage(queueName, request);
        const workerURL = `http://${keys.workerHost}:${keys.workerPort}`;
        console.log(workerURL);
        await axios.post(workerURL, { queueURL });
        return { messageID, queueURL, queueName }
    } catch (err) {
        console.log(err.message);
    }
};


module.exports = initiateQuery;