'use strict';

var APP_CONFIG = require('config');

module.exports = function(grunt) {
  /*jshint maxstatements:false */

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('build/grunt-tasks/');

  grunt.initConfig({

    config: {
      distPath: 'dist',
      basePath: APP_CONFIG.basePath,
      bowerPath: APP_CONFIG.bowerPath,
      staticPath: APP_CONFIG.staticPath,
      testPath: 'spec',
      tmpPath: '.tmp'
    },

    watch: {
      css: {
        files: ['<%= config.staticPath %>/style/**/*.scss'],
        tasks: ['compass:dev']
      },
      html: {
        files: ['<%= config.staticPath %>/{module,directive}/**/*.html'],
        tasks: ['cache-views']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= config.staticPath %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.staticPath %>/style/*.css',
          '<%= config.staticPath %>/**/*.js'
        ]
      }
    },

    clean: {
      tmp: {
        files: [{
          dot: true,
          src: [
            '<%= config.tmpPath %>',
            '.sass-cache/**/*'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.distPath %>/*'
          ]
        }]
      },
      views: {
        files: [{
          dot: true,
          src: [
            '<%= config.staticPath %>/views.js'
          ]
        }]
      },
      css: {
        files: [{
          dot: true,
          src: [
            '<%= config.staticPath %>/style/*.css'
          ]
        }]
      }
    },

    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: true,
        maxcomplexity: 10,
        maxdepth: 3,
        maxlen: 80,
        maxparams: 4,
        maxstatements: 10,
        newcap: true,
        noarg: true,
        node: true,
        noempty: true,
        nonew: true,
        nonbsp: true,
        quotmark: 'single',
        strict: true,
        sub: true,
        trailing: true,
        undef: true,
        unused: true
      },
      client: {
        node: false,
        options: {
          globals: {
            angular: true
          }
        },
        files: {
          src: [
            '<%= config.staticPath %>/**/*.js',
            '!<%= config.staticPath %>/views.js'
          ]
        }
      },
      server: {
        files: {
          src: [
            'Gruntfile.js',
            '<%= config.basePath %>/**/*.js',
            '!<%= config.staticPath %>/**',
            '!<%= config.bowerPath %>/**'
          ]
        }
      },
      'client-test': {
        options: {
          globals: {
            angular: true,
            describe: true,
            expect: true,
            it: true,
            beforeEach: true,
            afterEach: true,
            inject: true
          }
        },
        files: {
          src: [
            '<%= config.testPath %>/public/**/*.spec.js',
            '<%= config.testPath %>/util/**/*.js'
          ]
        }
      },
      'server-test': {
        options: {
          globals: {
            angular: true,
            describe: true,
            expect: true,
            it: true,
            beforeEach: true,
            afterEach: true
          }
        },
        files: {
          src: [
            '<%= config.testPath %>/**/*.spec.js',
            '!<%= config.testPath %>/public/**'
          ]
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome']
      },
      unit: {
        singleRun: true
      },
      dev: {
        browsers: ['Chrome'],
        singleRun: false,
        autoWatch: true
      }
    },

    compass: {
      options: {
        sassDir: '<%= config.staticPath %>/style/scss',
        cssDir: '<%= config.staticPath %>/style',
        imagesDir: '<%= config.staticPath %>/img',
        javascriptsDir: '<%= config.staticPath %>',
        environment: 'production',
        debugInfo: false
      },
      dist: {
        options: {
          relativeAssets: false
        }
      },
      dev: {
        options: {
          environment: 'development',
          debugInfo: true,
          relativeAssets: true
        }
      }
    },

    /**
     * Generate grunt configs for concat, uglify, cssmin.
     */
    useminPrepare: {
      html: '<%= config.basePath %>/lib/view/index.hjs',
      options: {
        dest: '<%= config.distPath %>/<%= config.staticPath %>'
      }
    },

    usemin: {
      html: ['<%= config.distPath %>/<%= config.basePath %>/lib/view/index.hjs']
    },

    cssmin: {
      distMain: {
        expand: true,
        cwd: '<%= config.tmpPath %>/concat',
        src: ['main.css'],
        dest: '<%= config.distPath %>/<%= config.staticPath %>',
      },
      distImages: {
        expand: true,
        cwd: '<%= config.tmpPath %>/concat',
        src: ['images.css'],
        dest: '<%= config.distPath %>/<%= config.staticPath %>',
      }
    },

    concat: {
    },

    ngmin: {
      dist: {
        files: [{
          src: '<%= config.distPath %>/<%= config.staticPath %>/scripts.js',
          dest: '<%= config.distPath %>/<%= config.staticPath %>/scripts.js'
        }]
      }
    },

    uglify: {
      dist: {
        files: [{
          src: '<%= config.distPath %>/<%= config.staticPath %>/scripts.js',
          dest: '<%= config.distPath %>/<%= config.staticPath %>/scripts.js'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dest: '<%= config.distPath %>',
          src: [
            '<%= config.basePath %>/**',
            '!<%= config.bowerPath %>/**',
            '!<%= config.staticPath %>/**'
          ]
        },
        {
          expand: true,
          dest: '<%= config.distPath %>/<%= config.basePath %>',
          src: [
            './node_modules/**'
          ]
        },
        {
          expand: true,
          dest: '<%= config.distPath %>',
          src: [
            './config/**'
          ]
        }]
      },
      distStatic: {
        files: [{
          expand: true,
          cwd: '<%= config.tmpPath %>/concat/',
          dest: '<%= config.distPath %>/<%= config.staticPath %>/',
          src: [
            'deps.js',
            'scripts.js',
            'deps.css'
          ]
        }]
      }
    },

    bgShell: {
      runServer: {
        cmd: 'NODE_ENV=dev node <%= config.basePath %>/server.js',
        bg: true
      },
      runDistServer: {
        cmd: 'NODE_ENV=dev node <%= config.basePath %>/server.js',
        bg: false
      }
    },

    html2js: {
      options: {
        base: '<%= config.staticPath %>',
        rename: function(moduleName) {
          return '/' + moduleName;
        }
      },
      main: {
        src: [
          '<%= config.staticPath %>/module/**/*.html',
          '<%= config.staticPath %>/directive/**/*.html'
        ],
        dest: '<%= config.staticPath %>/views.js'
      }
    }

  });

  grunt.registerTask('css', [
    'compass:dev'
  ]);

  grunt.registerTask('test', [
    'cache-views',
    'karma:unit'
  ]);

  grunt.registerTask('testwatch', [
    'karma:dev'
  ]);

  grunt.registerTask('cache-views', [
    'clean:views',
    'html2js:main'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'cache-views',
    'compass:dev',
    'bgShell:runServer',
    'watch'
  ]);

  grunt.registerTask('release', [
    'clean',
    'compass:dist',
    'jshint',
    'cache-views',
    'test',
    'copy:dist',
    'useminPrepare',
    'concat',
    'cssmin:distMain',
    'cssmin:distImages',
    'copy:distStatic',
    'ngmin:dist',
    // Run this one specifically so pre-minified deps are not reminified by
    // usemin generated config.
    'uglify:dist',
    'usemin'
  ]);

  grunt.registerTask('default', ['dev']);
};
