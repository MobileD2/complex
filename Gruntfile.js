module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      dev: {
        src: ['bower_components/jquery/jquery.js', 'plugin/complex.js'],
        options: {
          specs: './spec/*.js',
          helpers: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          template: 'SpecRunner.tmpl'
        }
      },
      build: {
        src: ['bower_components/jquery/jquery.js', 'build/complex.min.js'],
        options: {
          specs: './spec/*.js',
          helpers: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          template: 'SpecRunner.tmpl'
        }
      }
    },
    uglify: {
      all: {
        files: {
          'build/complex.min.js': ['plugin/complex.js']
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'plugin/**/*.js', 'spec/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine:dev']);
  grunt.registerTask('default', ['jasmine:dev', 'jshint', 'uglify', 'jasmine:build']);
};
