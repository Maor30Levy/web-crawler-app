const initiateQuery = require('../services/qeuryInit');
const { handleQueryComplition } = require('../services/streaming-handler');
const { getQueueURL } = require('../services/queue-and-message-services')
const newQuery = async (req, res) => {
    try {
        if (req.tree) return res.send(req.tree);
        const queryDetails = await initiateQuery(req.request);
        return res.send(queryDetails);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};
const stream = async (req, res) => {
    try {
        let tree = req.tree;
        if (tree) {
            const queueURL = await getQueueURL(req.request.qName);
            tree = await handleQueryComplition(tree, queueURL);
            return res.send(tree);
        }
        return res.status(404).send('Query not found.');
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};

module.exports = { newQuery, stream };