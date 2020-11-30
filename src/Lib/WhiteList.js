let WhiteList = [
    'http://localhost:3000',
    'http://127.0.0.1:8080'
];

if(process.env.NODE_ENV.trim() == 'dev'){
    WhiteList.push('chrome-extension://coohjcphdfgbiolnekdpbcijmhambjff');
}

module.exports = WhiteList;