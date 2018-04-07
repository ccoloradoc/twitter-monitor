const config = require('../config');
const { Facebook } = require('fb');
const fb = new Facebook();

class FacebookApi {
  post(message, link) {
    return new Promise((resolve, reject) => {
      // console.log(`${config.fb.page_id} - ${config.fb.access_token}`)
      fb.api(`${config.fb.page_id}/feed`, 'post', {
        message: message,
        link: link,
        access_token: config.fb.access_token
      }, (res) => {
        if(!res || res.error) reject(res);
        resolve(res)
      });
    });
  }
}

module.exports = FacebookApi;
