const { redisGetTree, redisSetTree } = require('../redis/tree-functions');

const getTreeFromDB = async (queueName) => {
    try {
        const tree = redisGetTree(queueName);
        return tree;
    } catch (err) {
        console.log(err);
    }
};

const setTree = async (queueName, tree) => {
    await redisSetTree(queueName, tree);
};

const getLevelGaps = (node, level) => {
    if (node.nodeLevel === level) {
        if (node.title.length === 0) {
            return [node]
        }
        else return []
    }
    else {
        if (node.children !== []) {
            let result = [];
            for (let child of node.children) {
                result = result.concat(getLevelGaps(child, level));
            }
            return result
        } else return [];
    }
};

const detectGapsInTree = (tree) => {
    let levelGap;
    const detectGap = (node) => {
        let currentLevel = node.nodeLevel;
        if (levelGap && currentLevel > levelGap) {
            return levelGap;
        }
        if (node.title.length === 0) {
            return levelGap = currentLevel
        };
        let result = currentLevel;
        for (let child of node.children) result = detectGap(child);
        return result;
    };
    return detectGap(tree.root)

};

const markersHandler = (id) => {
    let workID = id;
    for (let i = 1; i < workID.length; i++) {
        if (workID[i] === '/') {
            const sub = workID.substring(0, i + 1);
            workID = workID.replace(sub, '$');
            const num = parseInt(sub.slice(1, sub.length - 1));
            return { num, id: workID }
        }
    }
};

const getNodeByID = (tree, id) => {
    let node = tree.root;
    if (node.children.length === 0) return node;
    let workID = id;
    for (let i = 0; i < workID.length - 1; i++) {
        let footer;
        if (workID[i + 1] === '/') {
            const result = markersHandler(workID.slice(i + 1));
            workID = workID.slice(0, i + 1) + result.id;
            footer = result.num;
        } else footer = workID[i + 1];
        node = node.children[footer];
    }
    return node;
};

const checkTreeForOtherGaps = (tree) => {
    for (let gap in tree.gaps) {
        if (gap === true) continue;
        const node = getNodeByID(tree, gap)
        if (node.title.length > 0) tree.gaps[gap] = true;
    }
    const incompleteGaps = Object.values(tree.gaps).filter(gap => gap === false)
    if (incompleteGaps.length === 0) return true;
    return false;
};


module.exports = {
    setTree,
    getTreeFromDB,
    detectGapsInTree,
    getLevelGaps,
    checkTreeForOtherGaps
};