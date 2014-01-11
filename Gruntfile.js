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
      test: {
        files: {
          'build/test.js': [
            'client/test/**/*.js'
          ]
        },
        options: {
          transform: ['hbsfy'],
          external: ['jquery', 'underscore', 'backbone']
        }
      },
      app: {
        files: {
          'build/app.js': [
            'client/templates/**/*.hbs',
            'client/src/app.js'
          ]
        },
        options: {
          transform: ['hbsfy'],
          external: ['jquery', 'underscore', 'backbone']
        }
      }
    },

    clean: ['build', 'public/javascripts/*', 'public/styles/*'],

    concat: {
      dist: {
        src: ['build/vendor.js', 'build/templates.js', 'build/app.js'],
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

    karma: {
      options: {
        frameworks: ['mocha'],
        files: ['build/vendor.js', 'build/app.js', 'build/test.js']
      },
      dev: {
        singleRun: true,
        browsers: ['PhantomJS']
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

    simplemocha: {
      options: {
        globals: ['should', 'sinon'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'dot'
      },
      all: { src: ['test/**/*.js'] }
    },

    watch: {
      scripts: {
        files: [
          '*.js',
          'lib/**/*.js',
          'test/**/*.js',
          'client/src/**/*.js',
          'client/test/**/*.js',
          'client/templates/**/*.hbs'
        ],
        tasks: ['jshint', 'build', 'test']
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Tasks
  grunt.registerTask('default',     ['build']);
  grunt.registerTask('build',       [ 'browserify:vendor',
                                      'browserify:app',
                                      'concat']);
  grunt.registerTask('server',      ['concurrent']);
  grunt.registerTask('test',        ['test-client', 'test-server']);
  grunt.registerTask('test-server', ['simplemocha']);
  grunt.registerTask('test-client', ['browserify:test', 'karma:dev']);
};
