var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv[3];
var input3 = process.argv[4];
var omdb = require('omdb');
var fs = require('fs');

var client = new Twitter
({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var spotify = new Spotify
({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

if (input1==="my-tweet") 
{
	var params = {screen_name: 'FranticG'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) 
	{
  		if (!error) 
  		{
    		console.log(tweets);
    	}
    	else
    	{
    		console.log(error);
    	}
    });
}
else
	if (input1==="spotify-this-song") 
	{
		//console.log(process.argv[3]);
		if (!input2) 
		{
	        input2 = "The Sign Ace of Base";
	    };


		
		spotify.search({ type: 'track', query: input2 }, function(err, data) 
		{
			if (err) 
			{
				return console.log('Error occurred: ' + err);
			}

			console.log(Object.keys(data.tracks.items[0].artists[0] ));
	        console.log('Spotify Song Information Results: ');
	        console.log('--------------------------');
	        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
	        console.log("Track Title: " + data.tracks.items[0].name);
	        console.log("Link to Song: " + data.tracks.items[0].preview_url);
	        console.log("Album Title: " + data.tracks.items[0].album.name);
	        console.log('--------------------------');

		});
	}
	else
		if (input1==="movie-this") 
		{
			if (!input2)
			{
				input2 = "Mr.Nobody";
			};

			request("http://www.omdbapi.com/?t="+ input2 +"&y=&plot=short&apikey=40e9cece", function(error, response, body) 
			{
				if (!error && response.statusCode === 200) 
				{
					console.log('');
	                console.log('OMDB Movie Information: ');
	                console.log('--------------------------');
	                console.log("Movie Title: " + JSON.parse(body).Title);
	                console.log("Year of Release: " + JSON.parse(body).Year);
	                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	                console.log("Countries produced in: " + JSON.parse(body).Country);
	                console.log("Language: " + JSON.parse(body).Language);
	                console.log("Movie Plot: " + JSON.parse(body).Plot);
	                console.log("Actor(s): " + JSON.parse(body).Actors);
	                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
	                console.log('--------------------------');
				}
			});
		}
		else
			if (input1 === "do-what-it-says") 
			{

		        fs.readFile('random.txt', 'utf8', function(err, data) 
		        {
		            var arr = data.split(',');

		            input1 = arr[0].trim();
		            input2 = arr[1].trim();
		            run();

	        	});
	        }
