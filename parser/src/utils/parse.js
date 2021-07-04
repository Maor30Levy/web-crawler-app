const axios = require('axios');
const parse = require('node-html-parser');

const parseURL = async (url)=>{
    const children = [];
    try{
        const result = await axios.get(url);
        const html = result.data;
        const title = parse.parse(html).querySelector('title').innerText;
        console.log(title);
        const aListElements = parse.parse(html).querySelectorAll('a');
        aListElements.forEach((element)=>{
            const href =element.attributes.href;
            if(href && href.startsWith('http')) children.push(href);           
        });
        return {title,children};
    }catch(err){
        console.log(err);
    }
};

module.exports = parseURL;

