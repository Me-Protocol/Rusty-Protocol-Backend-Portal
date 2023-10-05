import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} from '@src/config/env.config';

const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const querystring = require('querystring');

export const getTwitterFriends = async ({
  your_access_token,
  your_access_token_secret,
  source_screen_name,
  target_screen_name,
}: {
  your_access_token: string;
  your_access_token_secret: string;
  source_screen_name: string;
  target_screen_name: string;
}) => {
  // Replace these with your Twitter API credentials
  const consumerKey = TWITTER_CONSUMER_KEY;
  const consumerSecret = TWITTER_CONSUMER_SECRET;
  const accessToken = your_access_token;
  const accessTokenSecret = your_access_token_secret;

  const oauth = OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    },
  });

  const requestData = {
    url: 'https://api.twitter.com/1.1/friendships/show.json',
    method: 'GET',
    data: {
      source_screen_name,
      target_screen_name,
    },
  };

  const token = {
    key: accessToken,
    secret: accessTokenSecret,
  };

  const authorization = oauth.authorize(requestData, token);
  const headers = oauth.toHeader(authorization);

  await axios
    .get(requestData.url, {
      params: requestData.data,
      headers: {
        ...headers,
        'User-Agent': 'YourApp',
      },
    })
    .then((response) => {
      console.log(response.data.following);
    })
    .catch((err) => {
      console.error(err.response.data);
    });
};
