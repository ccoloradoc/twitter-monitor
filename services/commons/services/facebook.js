const config = require('../config');
const axios = require('axios');

const FACEBOOK_API = 'https://graph.facebook.com/v2.8';

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
