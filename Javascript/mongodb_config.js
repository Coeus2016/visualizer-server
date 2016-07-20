/*var insertDocuments = function(db, callback)
 {
 // Get the documents collection
 var collection = db.collection('documents');
 // Insert some documents
 collection.insertMany([
 {a : 1}, {a : 2}, {a : 3}
 ], function(err, result) {
 console.log("Inserted 3 documents into the document collection");
 callback(result);
 });
 };
 */

var mongo = require("mongodb").MongoClient;

var url = 'mongodb://localhost:27017/exam'; //'mongodb://uStudentnumber:password@localhost:27017/uStudentnumber?authMechanism=DEFAULT&authSource=admin';

mongo.connect(url, function(error, db)
{
    console.log(error);
    console.log('MongoDB connected');

    // insertDocuments(db, function(result)
    // {
    //     console.log(result);
    //     db.close()
    // });
});
