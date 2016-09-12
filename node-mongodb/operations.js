var assert = require('assert');

exports.insertDocument = function(db,document,collection,callback){	
	var coll = db.collection(collection);

	//insert
	coll.insert(document,function(err,result){
		assert.equal(err,null);
		console.log('Inserted '+result.result.n +' documents into the document collection '+collection);
		callback(result);
	});

};

exports.findDocuments = function(db,collection,callback){	
	var coll = db.collection(collection);

	//insert
	coll.find().toArray(function(err,docs){
		assert.equal(err,null);
		callback(docs);
	});
	
};

exports.removeDocument = function(db,document,collection,callback){	
	var coll = db.collection(collection);

	//insert
	coll.deleteOne(document,function(err,result){
		assert.equal(err,null);
		console.log('Removed the document '+docuemnt);
		callback(result);
	});
	
};

exports.updateDocument = function(db,document, update, collection,callback){	
	var coll = db.collection(collection);

	//update
	coll.updateOne(document,
		{
			$set : update
		},
		null,
		function(err,result){
		assert.equal(err,null);
		console.log('Update the document  with'+update);
		callback(result);
	});
	
};