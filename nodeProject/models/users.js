var ObjectId = require('mongodb').ObjectId
var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback){
  //Get the users collection
  var collection = db.get().collection('users')
  //insert a user
//  var user = {id:1, username:'jeannemunk', fname:'Jeanne', lname:'Munk'}
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    //This tells you how many resulsts there are
    assert.equal(1, result.result.n)
    //This gives an array of everything you inserted
    assert.equal(1, result.ops.length)

    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}

exports.find = function(id, callback) {
  //Get users collection
  var collection = db.get().collection('users')
  //Find user
  collection.findOne({'_id': ObjectId(id)}, function(err, document) {
    assert.equal(err, null)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.update = function(user,callback) {
  //Get the users collection
  var collection = db.get().collection('users')
  user._id = ObjectId(user._id)
  //Update the user
  collection.update({'_id': user._id},
   { $set: user},
   function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Updated 1 document in the users collection')
    callback()
  })
}

exports.addTag = function(userId, tag, callback) {
  var collection = db.get().collection('users')
  //Add the tag
  collection.update(
    {'_id': ObjectId(userId)},
    {$push: {tags: tag }},
    function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Added 1 tag to a docuument in the users collection')
    callback()
  })
}

exports.removeTag = function(userId, tag, callback) {
  var collection = db.get().collection('users')
  //Add the tag
  collection.update(
    {'_id': ObjectId(userId)},
    {$pull: {tags: tag }},
     user,
    function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Added 1 tag to a docuument in the users collection')
    callback()
  })

}
