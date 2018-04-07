const config = require('../config');
const { Facebook } = require('fb');
const fb = new Facebook();

class FacebookApi {
  post(content) {
    return new Promise((resolve, reject) => {
      // console.log(`${config.fb.page_id} - ${config.fb.access_token}`)
      fb.api(`${config.fb.page_id}/feed`, 'post', {
        message: content,
        access_token: config.fb.access_token
      }, (res) => {
        if(!res || res.error) reject(res);
        resolve(res)
      });
    });
  }
}

module.exports = FacebookApi;
