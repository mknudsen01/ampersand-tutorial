var hapi = require('hapi');
var server = hapi.createServer(8080, 'localhost');
var moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var stylizer = require('stylizer');
var peopleAPI = require('./plugins/peopleAPI');


server.route({
  method: "GET",
  path: '/api/me',
  handler: function(request, reply) {
    reply({
      id: 123,
      givenName: 'Matthew',
      familyName: 'Knudsen',
      email: 'mknudsen01@gmail.com'
    });
  }
});

server.pack.register([
  peopleAPI,
  {
    plugin: moonboots,
    options: {
      appPath: '/{p*}',
      moonboots: {
        main: __dirname + '/client/app.js',
        developmentMode: config.isDev,
        stylesheets: [
          __dirname + '/public/bootstrap.css',
          __dirname + '/public/app.css'
        ],
        beforeBuildJS: function(){
          if (config.isDev){
            templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
          }
        },
        beforeBuildCSS: function(done){
          //can name a callback, that makes it happen asynchronously.
          if(!config.isDev) return done();
          stylizer({
            infile: __dirname + '/public/app/main.styl',
            outfile: __dirname + '/public/app.css',
            development: true,
            watch: __dirname + '/public/app/**/*.styl'
          }, done);
        }

      }
    }
  }], function() {
  server.start();
  console.log("app is running at 8080");
});


