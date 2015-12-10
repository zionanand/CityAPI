var express = require('express');

var routes = function (City) {
  var cityRouter = express.Router(); // get an instance of express router. 
  var cityController = require('../controllers/cityController')(City);
  
  cityRouter.route('/')
    //add city (accessed at POST http://localhost:8080/api/cities)
    .post(cityController.post)
    //get cities (accessed at GET http://localhost:8080/api/cities)
    .get(cityController.get);

  //use middleware to handle all requests
  cityRouter.use('/:cityId', cityController.findById);
  
  //on routess that end in /cities/:cityId 
  cityRouter.route('/:cityId')
    //get city details for a give cityId (accessed at GET http://localhost:8080/api/cities/:cityId)
    .get(cityController.getById)
    //update details for a given city (accessed at PUT http://localhost:8080/api/cities/:cityId)
    .put(cityController.put)
    // update a patch (accessed at PATCH http://localhost:8080/api/city/:cityId)
    .patch(cityController.patch)
    // delete the city with this id (accessed at DELETE http://localhost:8080/api/city/:cityId)
    .delete(cityController.remove);
  return cityRouter;
}

module.exports = routes;