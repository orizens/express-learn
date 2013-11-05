var googleapis = require('googleapis');

// Browser apps key
var API_KEY='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';

/**
 * Search Youtube API
 * @param request
 * @param response
 */
exports.search = function (req, res) {
    var query = req.param('query');
    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client){
            var params = {
                part: 'snippet',
                q: query || 'pearl jam',
                maxResults: 50
            };
            var req1 = client.youtube.search.list(params);
            req1.withApiKey(API_KEY);

            req1.execute(function (err, result) {
                console.log('search result', result);
                res.render('youtube', result);
            })
        });
}