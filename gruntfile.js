module.exports = function(grunt){

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        pug: {
            compile: {
                options: {
                    data: {
                        debug: true
                    }
                },
                files: {
                    "dist/index.html": "src/index.jade",
                    "dist/disponibles.html": "src/disponibles.jade"
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

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'dist/css/master.css': 'dist/css/master.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'dist/css/master.css',
                dest: 'dist/css/master.css'
            }
        },

        sass: {
            build: {
                files: {
                    'dist/css/screen.css': 'src/screen.sass'
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
                tasks: ['jade']
            },
            js: {
                files: ['src/main.coffee','src/algo.coffee'],
                tasks: ['coffee']
            },
            css: {
                files: ['src/**/*.sass'],
                tasks: ['buildcss']
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,                      
// Force tags to have a closing pair
                    'tagname-lowercase': true,             
// Force tags to be lowercase
                    'attr-lowercase': true,                
// Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,      
// Force attributes to have double quotes rather than single
                    'doctype-first': true,                 
// Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,              
// Force special characters to be escaped
                    'id-unique': true,                     
// Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,          
// Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true                 
// Prevent style tags. CSS should be loaded through 
                },
                src: ['dist/index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/js/base.min.js': ['assets/js/base.js']
                }
            }
        }

    });

    grunt.registerTask('default',   []);
    //grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildcss',  ['compass']);

};
