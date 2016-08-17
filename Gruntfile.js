'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    paths: {
      src: {
        dir: './src/modules/'
      },
      e2e: {
        dir: './e2e/'
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
        src: '<%= paths.src.dir %>index.html',
        dest: '<%= paths.dest.dir %>'
      },
      css: {
        expand: true,
        flatten: true,
        src: '<%= paths.src.dir %>core/styles/*.css',
        dest: '<%= paths.dest.dir %>'
      }
    },
    webpack: {
      dev: function () {
        var ExtractTextPlugin = require('extract-text-webpack-plugin');
        return {
          entry: '<%= paths.src.dir %>core/coreController.js',
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
        contentBase: '<%= paths.dest.dir %>',
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
        files: ["<%= paths.src.dir %>**/*"],
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
  grunt.loadNpmTasks('grunt-webpack');


  // Grunt tasks
  // --------------------------
  grunt.registerTask('run',
    ['build', 'webpack-dev-server:dev', 'watch:dev']
  );

  grunt.registerTask('test',
    ['build','protractor_webdriver:all', 'protractor:all']
  );

  grunt.registerTask('build',
    ['clean', 'copy', 'webpack:dev']
  );

  grunt.registerTask('default',
    ['run']
  );
};
