class CompaniesApi {
  constructor(app, model, fs, path, https, csv) {

    // FOR RETRIEVING ALL COMPANIES TICKERS
    app.get('/api/companies', function(req, res) {
      let downloadCsv = req.query.downloadCsv === 'true';

      if (downloadCsv) {
        const file = fs.createWriteStream("companies_tickers.csv"),
          url = 'https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv',
          companies = [],
          jsonPath = path.join(__dirname, 'companies_tickers.csv'),
          request = https.get(url, function(response) {
            response.pipe(file);

            const stream = fs.createReadStream(jsonPath);
            const csvParser = csv.parseStream(stream, {
              headers: true,
              delimiter: ',',
            })
              .on('data', row => {
                companies.push(row);
                csvParser.pause();
                module.exports.saveData(row, function(err) {
                  csvParser.resume();
                });
              })
              .on('end', () => {
                console.log('Finished csv parsing');
                if (companies && companies.length) {
                  for (let company of companies) {
                    model.find({ ticker: company.Symbol }, function(err, existingCompany) {
                      if (!err && !existingCompany.length) {
                        let mod = new model({ ticker: company.Symbol, name: company['Company Name'], exchange: 'NASDAQ' });
                        mod.save(function(err2, data) {
                          if (err2) {
                            console.error(err2);
                          } else {
                            console.log('Successfully saved company ' + company['Company Name']);
                          }
                        })
                      }
                    });
                  }
                }
              });
          });
      }

      model.find({}, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    //GET ALL COMPANIES COUNT
    app.get('/api/companies-count', function(req, res) {
      model.countDocuments({}).exec(function (err, count) {
        if (err) {
          res.send(err);
        } else {
          res.json({ count: count });
        }
      });
    });

    // DELETE LIST OF COMPANIES
    app.delete('/api/companies', function(req, res) {
      let companies = req.body;

      if (!companies) {
        console.error('Companies to delete missing', companies);
        res.sendStatus(406);
      }

      for (let company of companies) {
        model.deleteOne({ _id: company._id }, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Company has been deleted: ' + company._id);
          }
        });
      }

      res.send({ data: 'done' });
    });

  }
}

module.exports = {
  CompaniesApi : CompaniesApi
};

module.exports.saveData = function(data, callback) {
  // Simulate an asynchronous operation:
  setImmediate(callback);
};
