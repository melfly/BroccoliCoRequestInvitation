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
      dev: {
        entry: '<%= paths.src.dir %>modules/core/coreController.js',

        output: {
          path: '<%= paths.dest.dir %>',
          filename: 'app.bundle.js'
        },
        module: {
          loaders: [
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'html?attrs=img:src img:data-src'}
            //{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), exclude: /oldie.scss$/}
            //{test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=8192'},
            //{test: /\.woff$/, loader: 'url?limit=8192&minetype=application/font-woff'},
            //{test: /\.ttf$/, loader: 'url?limit==8192&minetype=application/octet-stream'},
            //{test: /\.svg$/, loader: 'url?limit=8192&minetype=image/svg+xml'},
            //{test: /\.eot$/, loader: 'file'}
          ]
          //,
          //postLoaders: options.postLoaders || []
        }
        ////,
        //watch: true,
        //keepalive: true
      },
      test: {}
    },
    'webpack-dev-server': {
      dev: {
        contentBase: './dist/',
        publicPath: '/',
        port: 9999,
        host: '0.0.0.0',
        //inline: true,
        stats: {
          colors: true,
          progress: true
        }
        //,
        //keepalive: true
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
