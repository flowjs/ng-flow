module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      },
      build: {
        src: 'dist/ng-flow.js',
        dest: 'dist/ng-flow.min.js'
      }
    },
    concat: {
      flow: {
        files: {
          'dist/ng-flow.js': [
            'bower_components/flow.js/dist/flow.js',
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
    },
    clean: {
      release: ["dist/"]
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
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

  grunt.registerTask('release', function(type) {
    type = type ? type : 'patch';
    grunt.task.run('bump-only:' + type);
    grunt.task.run('clean', 'build');
    grunt.task.run('bump-commit');
  });
};