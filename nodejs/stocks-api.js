class StocksApi {
  constructor(app, model) {
    // GET ALL EXISTING STOCKS
    app.get('/api/stocks', function(req, res) {
      const sort = req.query.sort,
            qTicker = req.query.ticker,
            qDate = req.query.date,
            qHigh = req.query.high,
            qLow = req.query.low,
            qOpen = req.query.open,
            qClose = req.query.close,
            qVolume = req.query.volume,
            q = {};
      let resultQ = {};

      if (qTicker) {
        q['ticker'] = qTicker;
      } else if (qDate) {
        q['date'] = qDate;
      } else if (qHigh) {
        q['high'] = qHigh;
      } else if (qLow) {
        q['low'] = qLow;
      } else if (qOpen) {
        q['open'] = qOpen;
      } else if (qClose) {
        q['close'] = qClose;
      } else if (qVolume) {
        q['volume'] = qVolume;
      }

      if (Object.entries(q).length) {
        resultQ = { $or: [] };
        for (const [key, value] of Object.entries(q)) {
          const obj = {};
          let newValue = value.replaceAll('\\.', '\\.') + '';
          obj[key] = value;//{ $regex : new RegExp('.*' + newValue + '.*'), $options: 'i' };

          resultQ['$or'].push(obj);
        }
      }

      model.find(q, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      }).limit(1000).sort(sort ? sort : '');
    });

    //GET STOCKS FOR CHART
    app.get('/api/stocks-for-chart', function(req, res) {
      const sort = req.query.sort,
        qTicker = req.query.ticker,
        qMode = req.query.mode,
        q = {};
      let qDate = req.query.date;

      if (qTicker) {
        q['ticker'] = qTicker;
      }
      if (qMode) {
        if (qMode === '1') {
          qDate = qDate.replaceAll('\\.', '\\.');
          q['date'] = {$regex: new RegExp( qDate + '.*:00:00'), $options: 'i'};
        }
      }

      const resQ = { $and: [{ 'ticker': q['ticker'] }, { 'date': q['date'] }]};

      model.find(resQ, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      }).limit(10).sort(sort ? sort : '');
    });

    // GET EXISTING STOCK BY ID
    app.get('/api/stocks/:id', function(req, res) {
      let stockId = req.params.id;

      if (!stockId) {
        console.error('Stock ID missing', stockId);
        res.sendStatus(406);
      }

      model.find({ _id: stockId }, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    //GET ALL STOCKS COUNT
    app.get('/api/stocks-count', function(req, res) {
      model.countDocuments({}).exec(function (err, count) {
        if (err) {
          res.send(err);
        } else {
          res.json({ count: count });
        }
      });
    });

    // ADD NEW STOCK(-S)
    app.post('/api/stocks', function(req, res) {
      if (Array.isArray(req.body)) {
        let stocks = req.body;

        if (stocks) {
          for (let stock of stocks) {
            model.find({ id: stock.id }, function(err, existingStock) {
              if (!err && !existingStock.length) {
                let mod = new model(stock);
                mod.save(function(err2, data) {
                  if (err2) {
                    console.error(err2);
                  } else {
                    console.log('Successfully saved stock ' + stock.id);
                  }
                })
              }
            });
          }
        }
      } else if (req.body) {
        let stock = req.body;

        // check if tweet already exist
        model.find({ id: stock.id }, function(err, existingStock) {
          if (!err && existingStock.length) {
            res.send({ data: 'already exist' });
          } else if (!err) {
            let mod = new model(stock);
            mod.save(function(err2, data) {
              if (err2) {
                res.send(err2);
              } else {
                res.send({ data: 'Successfully saved stock ' + stock._id });
              }
            })
          } else {
            res.send(err);
          }
        });
      }
    });

    // DELETE LIST OF STOCKS
    app.delete('/api/stocks', function(req, res) {
      let stocks = req.body;

      if (!stocks) {
        console.error('Stocks to delete missing', stocks);
        res.sendStatus(406);
      }

      for (let stock of stocks) {
        model.deleteOne({ _id: stock._id }, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Stock has been deleted: ' + stock._id);
          }
        });
      }

      res.send({ data: 'done' });
    });

  }
}

module.exports = {
  StocksApi : StocksApi
};
