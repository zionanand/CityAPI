var cityController = function (City) {

  var post = function (req, res) {
    var city = new City(req.body);
    city.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(201).send(city);
      }
    });
  }

  var get = function (req, res) {
    City.find(function (err, cities) {
      if (err)
        res.status(500).send(err);
      else {
        res.send(cities);
      }
    });
  }

  var findById = function (req, res, next) {
    City.findById(req.params.cityId, function (err, city) {
      if (err) {
        res.status(500).send(err);
      } else if (city) {
        req.city = city;
        next();
      } else {
        res.status(409).send({
          message: 'City not found!'
        });
      }
    })
  }

  var getById = function (req, res) {
    res.json(req.city);
  }

  var put = function (req, res) {
    req.city.name = req.body.name;
    req.city.country = req.body.country;
    req.city.save(function (err) {
      if (err) {
        res.statu(500).send(err);
      } else {
        res.json({
          message: 'City updated!'
        })
      }
    });
  }

  var patch = function (req, res) {
    if (req.body._id)
      delete req.body._id;
    for (var p in req.body) {
      req.city[p] = req.body[p];
    }

    req.city.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.city);
      }
    });
  }

  var remove = function (req, res) {
    req.city.remove(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(204).send('City deleted');
      }
    });
  }

  return {
    post: post,
    get: get,
    findById: findById,
    put: put,
    getById: getById,
    patch: patch,
    remove: remove
  }
}

module.exports = cityController;