const axios = require('axios');
const { keys } = require('../keys/keys');
const { deleteQueue, createMessage } = require('./queue-and-message-services');
const {
    detectGapsInTree, getLevelGaps,
    checkTreeForOtherGaps, setTree
} = require('./tree-services');

const endQuery = async (tree, queueURL) => {
    tree.completed = true;
    await deleteQueue(queueURL);
}

const insertGaps = async (tree, gaps, maxPages, maxLevel, queueName, queueURL) => {
    try {

        for (let i = 0; Object.values(tree.gaps).length < parseInt(tree.maxPages) && i < parseInt(tree.maxPages) && i < gaps.length; i++) {
            const gap = gaps[i]
            if (!(tree.gaps[gap.id])) {
                tree.gaps[gap.id] = false;
                const request = {
                    qName: queueName,
                    id: gap.id,
                    url: gap.url,
                    level: `${gap.nodeLevel}`,
                    maxLevel,
                    maxPages
                };
                await createMessage(request, queueURL);
                axios.post(keys.workerHost, { queueURL })
            }
        }
    } catch (err) {
        console.log(err)
    }
};

const handleQueryComplition = async (tree, queueURL) => {
    try {
        if (!tree.completed && tree.numOfNodes >= tree.maxPages) {
            const gapLevel = detectGapsInTree(tree);
            let gaps = [];
            if (Object.values(tree.gaps).length < parseInt(tree.maxPages) && gapLevel < tree.levelsRecorded[tree.levelsRecorded.length - 1] && gapLevel <= tree.maxLevel) {
                gaps = getLevelGaps(tree.root, gapLevel);
                await insertGaps(tree, gaps, `${tree.maxPages}`, `${tree.maxLevel}`, tree.title, queueURL);
            }

            else if (checkTreeForOtherGaps(tree)) {
                await endQuery(tree, queueURL)
            };
            await setTree(tree.title, tree);
        }
        return tree;
    } catch (err) {
        console.log(err)
    }

};




module.exports = { handleQueryComplition };