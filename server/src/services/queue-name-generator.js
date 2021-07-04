const generateQueueName = (url,maxlevel,maxPages)=>{
    let name = url;
    ''.replaceAll
    name = name.replace(/\W/g, '-');
    return `${maxlevel}-${name}-${maxPages}`;
}

module.exports = generateQueueName;
