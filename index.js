"use strict"
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const effects = ["minefield", "halfgravity", "chainsaw", "beartrap"];
const SweetMeetAccount = 'SweetMeatRunner'

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const Tweet = (status) => {
  return new Promise((resolve, reject) => {
    client.post('statuses/update', { status }, function(error, tweet, response) {
      if (error) {
        return reject(error);
      }
      return resolve()
    });
  })
}

const spam = () => {
  const status = `This game is so fun! Lets make some noise!!! 
    #${sample(effects)} @${SweetMeetAccount}`;

  return Tweet(status).then(()=>{
    console.log('Tweet posted correctly.')
  }).catch(e => console.log('Something terrible happend: ', e));
}

// Initialize bot
setInterval(spam, (process.env.INTERVAL_MINUTES || 60) * 60 * 1000);

// This is only for keep the server running on Heroku
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port,() => {
  console.log("Server Up");
})