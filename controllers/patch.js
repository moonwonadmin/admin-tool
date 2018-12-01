var Promise = require('bluebird');
var rp = require('request-promise');
var moonwon = '465183';
var API = 'http://localhost:3806';
var cookieAPI = API + '/cookie/465183';
var postURL = API + '/product/init';

var headers = {
  accept:'*/*',
  'accept-encoding':'gzip, deflate, br',
  'accept-language': 'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4,ja;q=0.2',
  'cache-control':'no-cache',
  'content-length':'449',
  'content-type':'application/json;charset=UTF-8',
  'cookie':'',
  'origin':'https://sell.smartstore.naver.com',
  'pragma':'no-cache',
  'referer':'https://sell.smartstore.naver.com/',
  'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
  'x-current-state': 'https://sell.smartstore.naver.com/#/products/origin-list'
}
var options = {
  method: 'PATCH',
  headers: headers,
  uri: 'https://sell.smartstore.naver.com/api/products/bulk-update?_action=updateGrid',
  body: null,
  json: true, // Automatically stringifies the body to JSON
  gzip: true
};

const storeFarmPatch = function(list) {
  const pureList = list.filter((item) => item.name);
  let requestData = {
    products: pureList,
    channelProductMap: {}
  }

  const bodyBuffer = Buffer.from(JSON.stringify(requestData));

  if (list.length === 0 ) return Promise.resolve('0');

  return new Promise(function(resolve, reject) {
    rp(cookieAPI).then((resp) => {
      const data = JSON.parse(resp);
      headers.cookie = data.cookie;
      headers['content-length'] = bodyBuffer.length + '';
      options['body'] = requestData;

      rp(options)
      .then((data) => {
        resolve(list.length);
      })
      .catch(function(err){
        console.log(JSON.stringify(err, null, ' '))
        console.log('StoreFarm Fail')
      });
    })
  })
}

module.exports = {
  storeFarmPatch
}