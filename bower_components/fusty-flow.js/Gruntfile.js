module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        options: {
          banner: '/*' +
            ' * MIT Licensed' +
            ' * http://github.com/flowjs/fusty-flow.js' +
            ' * Aidas Klimas' +
            ' */',
          compress: {
            sequences: true,  // join consecutive statemets with the “comma operator”
            properties: true,  // optimize property access: a["foo"] → a.foo
            dead_code: true,  // discard unreachable code
            drop_debugger: true,  // discard “debugger” statements
            unsafe: false, // some unsafe optimizations (see below)
            conditionals: true,  // optimize if-s and conditional expressions
            comparisons: true,  // optimize comparisons
            evaluate: true,  // evaluate constant expressions
            booleans: true,  // optimize boolean expressions
            loops: true,  // optimize loops
            unused: true,  // drop unused variables/functions
            hoist_funs: true,  // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: true,  // optimize if-s followed by return/continue
            join_vars: true,  // join var declarations
            cascade: true,  // try to cascade `right` into `left` in sequences
            side_effects: true,  // drop side-effect-free statements
            warnings: true,  // warn about potentially dangerous optimizations/code
            global_defs: {}     // global definitions
          }
        },
        files: {
          'build/fusty-flow.min.js': [
            'bower_components/flow.js/src/flow.js',
            'src/fusty-flow-factory.js',
            'src/fusty-flow.js'
          ]
        }
      }
    },
    concat: {
      flow: {
        files: {
          'build/fusty-flow.js': [
            'bower_components/flow.js/src/flow.js',
            'src/fusty-flow-factory.js',
            'src/fusty-flow.js'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('build', ['uglify', 'concat']);

};