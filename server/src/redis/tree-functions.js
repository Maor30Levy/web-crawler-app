const client = require('./redis-connect');

const redisGetTree = async (queueName) => {
    const stringfyTree = await client.getAsync(queueName);
    const treeObj = JSON.parse(stringfyTree);
    redisSetTree(queueName, treeObj);
    return treeObj;
};

const redisSetTree = async (queueName, tree) => {
    const stringfyTree = JSON.stringify(tree);
    await client.setexAsync(queueName, 600, stringfyTree);
};

module.exports = { redisGetTree, redisSetTree };
