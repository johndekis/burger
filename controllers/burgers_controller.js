var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res){
  res.redirect("/burgers");
});
router.get("/burgers", function(req, res) {
    burger.selectAll(function(data) {
      //change var name?
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});  
router.post("/burgers/create", function(req, res) {
    burger.insertOne([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, false
    ], function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
});  
router.put("/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  console.log("req.body: " + req.body);
  
  burger.updateOne({    
    devoured: req.body.devoured
     }, condition, function(result) {
    if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
        res.status(200).end();
      }
    });
});  

router.delete("/burgers/delete/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

//export router
module.exports = router;