class TweetsApi {
  constructor(app, model, http) {
    // GET ALL EXISTING TWEETS
    app.get('/api/tweets', function(req, res) {
      model.find({}, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    //GET ALL EXISTING TWEETS COUNT
    app.get('/api/tweets-count', function(req, res) {
      model.countDocuments({}).exec(function (err, count) {
        if (err) {
          res.send(err);
        } else {
          res.json({ count: count });
        }
      });
    });

    // GET EXISTING TWEET BY ID
    app.get('/api/tweets/:id', function(req, res) {
      let tweetId = req.params.id;

      if (!tweetId) {
        console.error('Tweet ID missing', tweetId);
        res.sendStatus(406);
      }

      model.find({ _id: tweetId }, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    // ADD NEW TWEET(-S)
    app.post('/api/tweets', function(req, res) {
      if (Array.isArray(req.body)) {
        let tweets = req.body;

        if (tweets) {
          for (let tweet of tweets) {
            model.find({ id: tweet.id }, function(err, existingTweet) {
              if (!err && !existingTweet.length) {
                let mod = new model(tweet);
                mod.save(function(err2, data) {
                  if (err2) {
                    console.error(err2);
                  } else {
                    // Creating a user
                    var post_data = querystring.stringify(tweet.user);
                    var post_options = {
                      host: '',
                      port: '8080',
                      path: '/api/users',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(post_data)
                      }
                    };
                    var post_req = http.request(post_options, function(res) {
                      res.setEncoding('utf8');
                      res.on('data', function (chunk) {});
                    });

                    // post the data
                    post_req.write(post_data);
                    post_req.end();
                    console.log('Successfully saved tweet ' + tweet.id);
                  }
                })
              }
            });
          }
        }
      } else if (req.body) {
        let tweet = req.body;

        // check if tweet already exist
        model.find({ id: tweet.id }, function(err, existingTweet) {
          if (!err && existingTweet.length) {
            res.send({ data: 'already exist' });
          } else if (!err) {
            let mod = new model(tweet);
            mod.save(function(err2, data) {
              if (err2) {
                res.send(err2);
              } else {
                res.send({ data: 'Successfully saved tweet ' + tweet._id });
              }
            })
          } else {
            res.send(err);
          }
        });
      }
    });

    // DELETE LIST OF TWEETS
    app.delete('/api/tweets', function(req, res) {
      let tweets = req.body;

      if (!tweets) {
        console.error('Tweets to delete missing', tweets);
        res.sendStatus(406);
      }

      for (let tweet of tweets) {
        model.deleteOne({ _id: tweet._id }, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Tweet has been deleted: ' + tweet._id);
          }
        });
      }

      res.send({ data: 'done' });
    });

  }
}

module.exports = {
  TweetsApi : TweetsApi
};
