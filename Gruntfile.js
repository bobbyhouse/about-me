module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Run a development server for the server-side JS
    nodemon: {
      dev:{
        options: {
          args: ['development'],
          watchedFolders: ['lib', 'app.js'],
          debug: true,
          env: {
            PORT: 3000
          }
        }
      }
    },

    // Lint client and server side JS files
    jshint: {
      all: ['*.js', 'lib/**/*.js', 'client/src/**/*.js']
    },

    simplemocha: {
      options: {
        globals: ['should', 'sinon'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: { src: ['test/**/*.js'] }
    },

    // Lint all JS files whenever they change
    watch: {
      scripts: {
        files: ['*.js', 'lib/**/*.js', 'client/src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'simplemocha'],
      }
    }
  });

  // Contrib Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3rd Party Plugins
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('server',  ['concurrent']);
  grunt.registerTask('test',    ['simplemocha']);
};
