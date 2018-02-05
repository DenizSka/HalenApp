var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  /*
      res.json([{
         id: 1,
         name: "Are you mine?"
       }, {
         id: 2,
         name: "Purple rain"
       }])
*/
        axios.get(`https://api.songkick.com/api/3.0/metro_areas/7644/calendar.json?apikey=bykUUqMTtEu6iQV2`)
        .then((songkickResponse) => {
          console.log(songkickResponse.data.resultsPage.results.event)
          res.json(songkickResponse.data.resultsPage.results.event)
          /*
          this.setState({
            apiData: res.data.resultsPage.results.event,
            apiDataLoaded: true,
          });
          */
        })
        .catch(err => console.log(err));
})

/*
var spotify = new Spotify({
  id: "ac534bcdccca45e88fd8e36714fb3e51",
  secret: "a44df5dc09de42c48bff419c48849a9b"
});

router.get('/', function(req, res, next) {

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items);
    res.json(data.tracks.items)

  });

});
*/

module.exports = router;
