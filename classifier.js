var twit = require('twitter');
var r = require('rethinkdb');
var config = require('./Javascript/rethinkdb_config.js');

var twitter = new twit({
	consumer_key: 'on8ErOJyiiCzgysZNAj0hsH8l',
	consumer_secret: 'FPDCuFUu7ZxqMxBnPoYvustPcfN72UWvTh53OXajlN7u9Z2tEb',
	access_token_key: '783427813672189952-2QxyEih9Rtw4gQozGwR8BjqW9n852oJ',
	access_token_secret: 'cM8utNnsbcNxJV7JpvI6Oeu6ItNVuC6IKmBzRWOTBWF6r'
});

var search = "#tornado";
var count = 1;
twitter.stream('statuses/filter', {track: search, language: "en"}, function(stream){
	stream.on('data', function(tweet){

		var classifier = require('classifier');
		var bayes = new classifier.Bayesian({default: "notclassified"});
		bayes.train('Moving E, Moving NE, Moving S, Moving SE, Moving W, Moving NW, Moving SW', 'disaster'); //direction
		bayes.train('wind to, max winds, mph', 'disaster');
		bayes.train('outbreak, reported', 'disaster');
		bayes.train('Hi, talk, insurance, camping, story, study, rainbow, strobe, GR4, imagine', 'notDisaster'); //any tweet that mentions any of these words which have nothing to do with tornados is irrelevant
		bayes.train('2015, 2014, 2013, 2012, 2011, 2010', 'notDisaster'); //Any tweet that mentions a tornado before 2016 is not relevant
		var state = bayes.classify(tweet.text);

		console.log("id: " +  count + "\ntweet: " + tweet.text +"\ncategory: " + state + "\n");
	
		count++;
		
		/*	
		var insertTweet = {
			"id": count,
			"tweet": tweet.text
		};	
		r.connect(config.twitterFeedDatabase).then(function(c) {
			conn = c;
			return r.dbCreate(config.twitterFeedDatabase.db).run(conn);
		}).then(function() {
			return r.tableCreate("twitterFeed").run(conn);
		}).then(function() {
			return r.table("twitterFeed").insert(JSON.parse(insertTweet)).run(conn);
		}).error(function(err) {
			if(err.msg.indexOf("already exists") == -1)
				console.log(err);
		});*/
	});
	stream.on('error', function(error){
		console.log(error);
	});
});
