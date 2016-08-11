'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    paths: {
      node: {
        dir: './node_modules/'
      },
      config: {
        dir: 'config/',
        jscs: '<%= paths.config.dir %>jscs/.jscsrc',
        jshint: '<%= paths.config.dir %>jshint/.jshintrc',
        webpack: '<%= paths.config.dir %>webpack/webpack.config.js'
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
    webpack: {
      dev: {
        entry: '<%= paths.src.dir %>modules/index.js',
        output: {
          path: '<%= paths.dest.dir %>',
          filename: 'app.js'
        },
        watch: true,
        keepalive: true
      },
      test: {

      }
    },
    'webpack-dev-server': {
      local: {
        webpack: {
          debug: true,
          devtool: '#eval',
          entry: {
            main: [
              'webpack-dev-server/client?http://localhost:9199'
            ]
          },
          env: 'local'
        },
        contentBase: './dist/',
        publicPath: '/',
        port: 9999,
        host: '0.0.0.0',
        inline: true,
        stats: {
          colors: true,
          progress: true
        },
        watch: true,
        keepalive: true
      }
    }
  });

  // Load required files
  // --------------------------
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-todo');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-protractor-runner');


  // Grunt tasks
  // --------------------------
  grunt.registerTask('run',
    ['jshint', 'todo', 'clean', 'copy', 'webpack-dev-server:local', 'watch']
  );

  grunt.registerTask('test',
    ['jshint', 'clean', 'webpack:test', 'karma:unit']
  );

  grunt.registerTask('build',
    ['clean', 'webpack:dev']
  );

  grunt.registerTask('default',
    ['run']
  );
};
