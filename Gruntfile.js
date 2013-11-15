module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      vendor: {
        src: ['client/requires/**/*.js'],
        dest: 'build/vendor.js',
        options:{
          shim: {
            jquery: {
              path: 'client/requires/js/jquery.js',
              exports: '$'
            },
            underscore: {
              path: 'client/requires/js/underscore.js',
              exports: '_'
            },
            backbone: {
              path: 'client/requires/js/backbone.js',
              depends: {
                jquery: '$',
                underscore: '_',
              },
              exports: 'Backbone'
            }
          }
        }
      },
      app: {
        files: {
          'build/app.js': [
            'client/src/main.js'
          ]
        },
        options: {
          external: ['jquery', 'underscore', 'backbone']
        }
      }
    },

    clean: ['build', 'public/javascripts/*'],

    concat: {
      dist: {
        src: ['build/vendor.js', 'build/app.js'],
        dest: 'public/javascripts/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Lint client and server side JS files
    jshint: {
      all: ['*.js', 'lib/**/*.js', 'client/src/**/*.js']
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3rd Party Plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build',   ['browserify:vendor', 'browserify:app', 'concat']);
  grunt.registerTask('server',  ['concurrent']);
  grunt.registerTask('test',    ['simplemocha']);
};
