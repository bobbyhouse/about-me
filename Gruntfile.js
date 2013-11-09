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


    // Lint all JS files whenever they change
    watch: {
      scripts: {
        files: ['*.js', 'lib/**/*.js', 'client/src/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // Contrib Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3rd Party Plugins
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  // Tasks
  grunt.registerTask('server', ['concurrent']);
};
