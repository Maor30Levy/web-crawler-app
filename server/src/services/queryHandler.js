const { createQueue, createMessage } = require('./queue-and-message-services');

const createQueueAndMessage = async (queueName, request) => {
    try {
        const queueURL = await createQueue(queueName);
        if (queueURL) {
            const messageID = await createMessage(request, queueURL)
            return { messageID, queueURL };
        }

    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    createQueueAndMessage
};