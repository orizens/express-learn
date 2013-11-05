var GapiHandler = require('./gapi');

// Browser apps key
var API_KEY='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';

var youtubeHandler = GapiHandler.create({
    discover: function() {
        return this.googleapis.discover('youtube', 'v3');
    },

    api: function(){
        return this.client.youtube.search.list;
    },
    key: API_KEY,
    render: function(err, result, res) {
        res.render('youtube', result);
    }
});

/**
 * Search Youtube API
 * @param request
 * @param response
 */
exports.search = function (req, res) {
    var query = req.param('query');
    youtubeHandler.set('q', query);
    youtubeHandler.request(res);
}