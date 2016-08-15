'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    paths: {
      node: {
        dir: './node_modules/'
      },
      config: {
        dir: 'config/',
      },
      src: {
        dir: './src/'
      },
      dest: {
        dir: './dist/'
      }
    },
    clean: {
      build: ['<%= paths.dest.dir %>']
    },
    copy: {
      main: {
        expand: true,
        flatten: true,
        src: 'src/modules/index.html',
        dest: 'dist/'
      },
      css: {
        expand: true,
        flatten: true,
        src: 'src/modules/core/styles/*.css',
        dest: 'dist/'
      }
    },
    webpack: {
      dev: function () {
        var ExtractTextPlugin = require('extract-text-webpack-plugin');
        return {
          entry: '<%= paths.src.dir %>modules/core/coreController.js',
          output: {
            path: '<%= paths.dest.dir %>',
            filename: 'app.bundle.js'
          },
          module: {
            loaders: [
              {test: /\.json$/, loader: 'json-loader'},
              {test: /\.html$/, loader: 'html?attrs=img:src img:data-src'},
              {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass')}
            ]
          },
          plugins: [
            new ExtractTextPlugin("style.css")
          ]
        };
      }()
    },
    'webpack-dev-server': {
      dev: {
        contentBase: './dist/',
        publicPath: '/',
        port: 9999,
        host: '0.0.0.0',
        stats: {
          colors: true,
          progress: true
        }
      }
    },
    watch: {
      dev: {
        files: ["src/modules/**/*"],
        tasks: ["copy", "webpack:dev"],
        options: {
          spawn: true
        }
      }
    }
  });

  // Load required files
  // --------------------------
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-protractor-runner');


  // Grunt tasks
  // --------------------------
  grunt.registerTask('run',
    ['clean', 'copy', 'webpack:dev', 'webpack-dev-server:dev', 'watch:dev']
  );

  //grunt.registerTask('test',
  //  ['jshint', 'clean', 'webpack:test', 'karma:unit']
  //);

  grunt.registerTask('build',
    ['clean', 'copy', 'webpack:dev']
  );

  grunt.registerTask('default',
    ['run']
  );
};
