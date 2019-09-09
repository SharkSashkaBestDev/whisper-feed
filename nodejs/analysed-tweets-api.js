class AnalysedTweetsApi {
  constructor(app, model) {

    // GET ALL EXISTING ANALYSED TWEETS
    app.get('/api/tweets-analysed', function(req, res) {
      model.find({}, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    //GET ALL ANALYSED TWEETS COUNT
    app.get('/api/tweets-analysed-count', function(req, res) {
      model.countDocuments({}).exec(function (err, count) {
        if (err) {
          res.send(err);
        } else {
          res.json({ count: count });
        }
      });
    });

    // GET EXISTING ANALYSED TWEET BY ID
    app.get('/api/tweets-analysed/:id', function(req, res) {
      let analysedTweetId = req.params.id;

      if (!analysedTweetId) {
        console.error('Analysed tweet ID missing', analysedTweetId);
        res.sendStatus(406);
      }

      model.find({ _id: analysedTweetId }, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    // DELETE LIST OF ANALYSED TWEETS
    app.delete('/api/tweets-analysed', function(req, res) {
      let analysedTweets = req.body;

      if (!analysedTweets) {
        console.error('Analysed tweets to delete missing', analysedTweets);
        res.sendStatus(406);
      }

      for (let analysedTweet of analysedTweets) {
        model.deleteOne({ _id: analysedTweet._id }, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Analysed tweet has been deleted: ' + analysedTweet._id);
          }
        });
      }

      res.send({ data: 'done' });
    });

  }
}

module.exports = {
  AnalysedTweetsApi : AnalysedTweetsApi
};
