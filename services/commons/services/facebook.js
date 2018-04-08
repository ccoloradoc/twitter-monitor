const config = require('../config');
const axios = require('axios');

class FacebookApi {
  post(message, link) {
    return axios.post(`${FACEBOOK_API}/${config.fb.page_id}/feed`, {
      message: message,
      link: link,
      access_token: config.fb.access_token
    });
  }
}

module.exports = FacebookApi;
