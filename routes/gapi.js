var googleapis = require('googleapis');

function GapiHandler(config) {
	this.googleapis = googleapis;
    this.params = {
        part: 'snippet',
        q: ''
    };
    // parse configuration
    if (config) {
        this.config = config;
        
        if (config.render) {
            this.render = config.render;
        }
        if (config.discover) {
            config.discover.call(this).execute(this.prepare.bind(this));;
        }
    }
}

GapiHandler.prototype = {
    prepare: function(err, client) {
        this.client = client;
        this.req = this.getApi();
        this.req.withApiKey(this.config.key);
    },

    request: function(res) {
        this.res = res;
        this.req.execute(this.response.bind(this));
    },

    response: function (err, result) {
        if (err) {
            console.log('Error in GAPI request:', err);
            this.res.end();
            return;
        }
        this.render.call(this, err, result, this.res);
    },

    // setter for params
    set: function(key, value) {
        if (key){
            // if key is an object - iterate and copy values
            if (key.toString().indexOf('Object') > -1) {
                Object.keys(key).forEach(function(param, val) {
                    this.params[param] = val;
                });
            }
            this.params[key] = value;
        }
    },

    getApi: function () {
        return this.config.api.call(this)(this.params);
    }
}

exports.create = function(config) {
	return new GapiHandler(config);
}