class UsersApi {
  constructor(app, model) {
    // GET ALL EXISTING USERS
    app.get('/api/users', function(req, res) {
      model.find({}, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    //GET ALL EXISTING USERS COUNT
    app.get('/api/users-count', function(req, res) {
      model.countDocuments({}).exec(function (err, count) {
        if (err) {
          res.send(err);
        } else {
          res.json({ count: count });
        }
      });
    });

    // GET EXISTING USER BY ID
    app.get('/api/users/:id', function(req, res) {
      let userId = req.params.id;

      if (!userId) {
        console.error('User ID missing', userId);
        res.sendStatus(406);
      }

      model.find({ _id: userId }, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });

    // ADD NEW USER(-S)
    app.post('/api/users', function(req, res) {
      if (Array.isArray(req.body)) {
        let users = req.body;

        if (users) {
          for (let user of users) {
            model.find({ id: user.id }, function(err, existingUsers) {
              if (!err && !existingUsers.length) {
                let mod = new model(user);
                mod.save(function(err2, data) {
                  if (err2) {
                    console.error(err2);
                  } else {
                    console.log('Successfully saved user ' + user._id);
                  }
                })
              }
            });
          }
        }
      } else if (req.body) {
        let user = req.body;

        // check if tweet already exist
        model.find({ id: user.id }, function(err, existingUsers) {
          if (!err && existingUsers.length) {
            res.send({ data: 'already exist' });
          } else if (!err) {
            let mod = new model(user);
            mod.save(function(err2, data) {
              if (err2) {
                res.send(err2);
              } else {
                res.send({ data: 'Successfully saved user ' + user._id });
              }
            })
          } else {
            res.send(err);
          }
        });
      }
    });

    // UPDATE EXISTING USER BY ID
    app.put('/api/users/:id', function(req, res) {
      let userId = req.params.id;

      if (!userId) {
        console.error('User ID missing', userId);
        res.sendStatus(406);
      }

      model.findByIdAndUpdate(userId, { name: req.body.name, address: req.body.address },
        function(err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send({ data: 'Record has been updated' });
          }
        });
    });

    // DELETE USER BY ID
    app.delete('/api/users/:id', function(req, res) {
      let userId = req.params.id;

      if (!userId) {
        console.error('User ID missing', userId);
        res.sendStatus(406);
      }

      model.deleteOne({ _id: userId }, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send({ data: 'Record has been deleted' });
        }
      });
    });

    // DELETE LIST OF USERS
    app.delete('/api/users', function(req, res) {
      let users = req.body;

      if (!users) {
        console.error('Users to delete missing', users);
        res.sendStatus(406);
      }

      for (let user of users) {
        model.deleteOne({ _id: user._id }, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('User has been deleted: ' + user._id);
          }
        });
      }

      res.send({ data: 'done' });
    });

  }
}

module.exports = {
  UsersApi : UsersApi
};
