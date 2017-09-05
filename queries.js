
  var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    entries = require('./listings.json'),
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

var findLibraryWest = function(db, callback) {
   var cursor =db.collection('listings').find( { "name": "Library West"} );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};



var removeCable = function(db, callback) {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
    db.collection('listings').deleteOne(
      { "code": "CABL" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );

};
var updatePhelpsMemorial = function(db, callback) {
   db.collection('listings').updateOne(
      { "name" : "Phelps Laboratory" },
      { $set: { "address": "701 N Broadway, Sleepy Hollow, NY 10591" } },
      function(err, results) {
        console.log(results);
        callback();
   });
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
};
var retrieveAllListings = function(db, callback) {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   db.collection('listings').aggregate(
     [
       { $project: { name: "$name", _id : 0 } }
     ]).toArray(function(err, result) {
     assert.equal(err, null);
     console.log(result);
     callback(result);
   });
};

MongoClient.connect(config.db.uri, function(err, db) {
  assert.equal(null, err);
  findLibraryWest(db, function() {
      db.close();
  });
  removeCable(db, function() {
      db.close();
  });
  updatePhelpsMemorial(db, function() {
      db.close();
  });
  retrieveAllListings(db, function() {
      db.close();
  });

});

console.log('done');