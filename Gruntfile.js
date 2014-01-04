module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      },
      build: {
        src: 'build/ng-flow.js',
        dest: 'build/ng-flow.min.js'
      }
    },
    concat: {
      flow: {
        files: {
          'build/ng-flow.js': [
            'bower_components/flow.js/src/flow.js',
            'src/provider.js',
            'src/directives/init.js',
            'src/directives/btn.js',
            'src/directives/drop.js',
            'src/directives/img.js',
            'src/directives/transfers.js',
            'src/ng-flow.js'
          ]
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {

      },
      continuous: {
        singleRun: true
      }
    }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask('build', ['concat', 'uglify:build']);
  grunt.registerTask('test', ['karma:continuous']);
  grunt.registerTask('watch', ['karma:watch']);

};