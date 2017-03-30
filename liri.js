// Require node packages
var spotify = require('spotify');
var twitter = require('twitter');
var request = require('request');
var keys = require("./keys.js");

// Get the keys from keys.js
var myKeys = keys.twitterKeys;



// Function for calling searching for a movie and geting an OMDB request
var omdb = function(movieRequested) {

	// The default movie is Mr. Nobody
	var movie = "Mr. Nobody";

	// Unless the user enters a movie it uses Mr. Nobody
	if (movieRequested != null){
		movie = movieRequested;
	};
// Create the OMDB request
request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body){
	if (!error && response.statusCode == 200){
		// make the results JSON format
		var json = JSON.parse(body);

		// display the correct information
		console.log("---------------");
		console.log("OMDB Search");
		console.log("---------------");
		console.log(json.Title);
		console.log(json.year);
		console.log(json.imdbRating);
		console.log(json.Country);
		console.log(json.Language);
		console.log(json.Plot);
		console.log(json.Actors);
		console.log(json.tomatoRating);
		console.log(json.tomatoURL);
	}
})

};

// Create function for searching a song in spotify
var spotifyRequest = function(songRequested) {

	// The default song is The Sign by Ace of Base
	var song = "The Sign";

	// Unless the user enters a song it is the default song
	if (songRequested != null) {
		song = songRequested;
	};

	// Create the spotify request
	spotify.search({type: 'track', query: song}, function(err, data) {

		// display the correct information
		console.log("---------------");
		console.log("Spotify search");
		console.log("---------------");
		console.log(data.tracks.items[0].artists.name);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].preview_url);
		console.log(data.tracks.items[0].album.name);
	})

};

var tweets = function() {

	var params = {screen_name: 'brendonjmc'};
	myKeys.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			console.log(tweets.text);
		}
	})

};

switch(process.argv[2]) {
		
		case 'movie-this':
		omdb(process.argv[3]);
		break;

		case 'spotify-this-song':
		spotifyRequest(process.argv[3]);
		break;

		case 'my-tweets':
			tweets();
			break;


}




