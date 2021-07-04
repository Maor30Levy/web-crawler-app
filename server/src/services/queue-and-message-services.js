const {
    AWSCreateQ,
    AWSGetQueueURL,
    AWSCreateMessage,
    AWSDeleteQ
} = require('../aws/sqs');


const createQueue = async (queueName) => {
    return await AWSCreateQ(queueName);
};

const getQueueURL = async (queueName) => {
    return await AWSGetQueueURL(queueName);
};

const createMessage = async (request, queueURL) => {
    return await AWSCreateMessage(request, queueURL);
};

const deleteQueue = async (queueURL) => {
    await AWSDeleteQ(queueURL);
};

module.exports = {
    createQueue,
    getQueueURL,
    createMessage,
    deleteQueue
}


