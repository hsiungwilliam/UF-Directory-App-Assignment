/* Fill out these functions using Mongoose queries*/

'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    entries = require('./listings.json'),
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');
var assert = require('assert');





/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

 var listings = entries.entries;

var insertDocument = function(index, db, callback) {
   var currentDate = new Date();
   var newLat = undefined;
   var newLon = undefined;
   var newAdd = undefined;
   if(listings[index].coordinates == undefined){

   }
   else {
    newLat = listings[index].coordinates.latitude;
    newLon = listings[index].coordinates.longitude;
   }
   if(listings[index].address == undefined){

   }
   else{
    newAdd = listings[index].address;
   }
   db.collection('listings').insertOne( {
        code: listings[index].code,
        name: listings[index].name,
        coordinates: {
          latitude: newLat,
          longitude: newLon,
        },
        address: newAdd,
        created_at: currentDate,
        updated_at: currentDate
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the listings collection.");
    callback();
  });
};


/* Connect to your database */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.db.uri, function(err,db){
  assert.equal(null, err);
  for(var i = 0; i < listings.length; i++){
    insertDocument(i, db, function() {
      db.close();
    });
  }
});



/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */