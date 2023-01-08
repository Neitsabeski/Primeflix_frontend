const axios = require('axios');

var apiBasedUrl = "https://api.themoviedb.org/3";
var imgBasedUrl = "https://image.tmdb.org/t/p/w500";

var apiKey = "bc50e594aa1023bd0381adbe75d409a9";

var languages = { "en": "en-US", "fr":"fr-EU"};

var searchRoute = '/search/movie';

var tmdb = {

    clearTitle: function(title){
        var cleared = "";
        
        Object.keys(title).forEach(c => {
            if(title[c] == ' ') cleared += '%';
            else cleared += title[c];
        });

        return cleared;
    },

    searchMovie: async function(title, lang){

        var params = new Object;
        params.language = languages[lang];
        params.api_key = apiKey;
        params.query = this.clearTitle(title);

        var request = this.request(apiBasedUrl, searchRoute, params);

        var res = await this.execRequest(request);
        
        return res.results[0];
    },

    imgPath:  async function(title, lang){

        var movie = await this.searchMovie(title, lang);

        var request = this.request(imgBasedUrl, movie.poster_path, {});

        return this.request(imgBasedUrl, movie.poster_path, {});
    },

    request: function(basedUrl, route, params){

        var request = basedUrl + route;

        if(Object.keys(params).length > 0) request += '?';
        
        Object.keys(params).forEach(key => {
            request += key + '=' + params[key];
            if( !(key == Object.keys(params).pop()) ){
                request += '&';
            }
        });

        return request;
    },

    execRequest: async function(request){
        var res = await axios.get(request);
        return res.data;
    }
};

export default tmdb;