module.exports = function(grunt){

  "use strict";
  require("matchdep").filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    pug: {
      compile: {
        options: {
          data: require('./src/data.js') 
        },
        files: {
          'dist/index.html': 'src/index.jade',
          'dist/disponibles.html': 'src/disponibles.jade'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'dist/js/main.js': 'src/main.coffee',
          'dist/js/algo.js': 'src/algo.coffee'
        }
      }
    },

    compass: {
      dist: {
       options: {
        sassDir: 'src/',
        cssDir: 'dist/css/',
        environment: 'production'
       }
      }
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['dist/js/*.js','dist/css/*.css','dist/*.html'],
        //tasks: ['buildcss','jade','coffee']
      },
      html: {
        files: ['src/index.jade','src/disponibles.jade'],
        //tasks: ['htmlhint']
        tasks: ['pug']
      },
      js: {
        files: ['src/main.coffee'],
        tasks: ['coffee']
      },
      css: {
        files: ['src/**/*.sass'],
        tasks: ['buildcss']
      }
    },

    uglify: {
      build: {
        files: {
          'dist/js/base.min.js': ['assets/js/base.js']
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dev: {
        src: (deps => deps.js.map(dep => deps.dir + '/' + dep + '.js'))(require('./dependencies.js')),
        dest: 'dist/js/vendor.js',
        nonull: true 
      },
      production: {
        src: (deps => deps.js.map(dep => deps.dir + '/' + dep + '.min.js'))(require('./dependencies.js')),
        dest: 'dist/js/vendor.js',
        nonull: true 
      }
    },

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/vendor.css': (deps => deps.css.map(dep => deps.dir + '/' + dep + '.css'))(require('./dependencies.js')),
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['assets/images/**'], dest: 'dist/images/'},
          {expand: true, src: ['assets/gallery/**'], dest: 'dist/gallery/'},
          {expand: true, src: ['assets/fonts/**'], dest: 'dist/fonts/'}
        ],
      },
    }
  });

  grunt.registerTask('default',  []);
  //grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('buildcss', ['compass']);

};
