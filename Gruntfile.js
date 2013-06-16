'use strict';


module.exports = function(grunt) {

    var jsCSSheaders = {
        'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=3600000'
    };

    grunt.initConfig({

        aws: grunt.file.readJSON('config/grunt-aws.json'),

        clean: {
            prep: ['dist'],
            post: [
                'dist/styles',
                'dist/vendor',
                'dist/coffee',
                'dist/temp',
                'dist/styles/master.css'
            ]
        },

        copy: {
            sites: {
                files: [{ 
                    expand: true, 
                    cwd: 'app', 
                    src: ['*.html','*.ico','robots.txt','ga.js'], 
                    dest: 'dist'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 7000,
                    base: 'dist'
                }
            }
        },

        watch: {
            files: ['app/**'],
            tasks: ['build'],
            options: {
                livereload: true
            }
        },

        concat: {
            // Concat all global JavaScript (libraries, core, etc.)
            libs: {
                src: [
                    'dist/vendor/zepto.min.js',
                    'dist/vendor/prettify.js'
                    // 'dist/vendor/highlight.pack.js'
                ], dest: 'dist/temp/vendor.js'
            },
            app: {
                src: [
                    'dist/temp/vendor.js',
                    'dist/temp/main.js'
                ], dest: 'dist/app.js'
            }
        },

        less: {
            master: {
                files: {
                    'dist/master.css': 'dist/styles/master.less'
                }
            }
        },

        coffee: {
            app: {
                files: {
                    'dist/temp/main.js': 'dist/coffee/main.coffee'
                }
            }
        },

        // Minify CSS
        cssmin: {
            site: {
                expand: true,
                cwd: 'dist',
                src: ['master.css'],
                dest: 'dist',
                ext: '.min.css'
            }
        },

        // Point HTML to newly-minified CSS + JS
        usemin: {
            html: ['dist/index.html']
        },

        // Compress all HTML files
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: false,
                    removeEmptyAttributes: true
                },
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },

        jekyll: {
            build: { src: 'app', dest: 'dist' }
        },


        // shell: {
        //     jekyll: {
        //         command: 'jekyll build',
        //         stdout: true
        //     }
        // },


        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= aws.bucket %>',
                access: 'public-read'
            },

            test: {
                options: {
                    encodePaths: true
                },
                upload: [
                    {
                        src: 'dist/favicon.ico',
                        dest: 'favicon.ico',
                        gzip: true,
                        headers: {'Cache-Control': 'max-age=604800000' }
                    },{
                        src: 'dist/robots.txt',
                        dest: 'robots.txt',
                        gzip: true,
                        headers: {'Cache-Control': 'max-age=604800000' }
                    },{
                        src: 'dist/index.html',
                        dest: 'index.html',
                        gzip: true
                    },{
                        src: 'dist/master.min.css',
                        dest: 'master.min.css',
                        headers: { 'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=604800000' },
                        gzip: true
                    },{
                        src: 'dist/ga.js',
                        dest: 'ga.js',
                        headers: { 'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=604800000' },
                        gzip: true
                    },{
                        src: 'dist/img/**',
                        dest: 'img/'
                    },{
                        src: 'dist/fonts/**',
                        dest: 'fonts'
                    },{
                        src: 'dist/2013/**',
                        dest: '2013',
                        gzip: true
                    }
                ]
            }

        } // end s3

    }); // end .initConfig()


    // grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-s3');



    // Default task(s).
    grunt.registerTask('build', [
        'clean:prep',
        'jekyll',
        // 'copy',  // now handled by jekyll task
        'less',
        'coffee',
        'concat',
        'cssmin',
        'clean:post'
        // 'usemin',    
        // 'htmlmin'    
    ]);

    grunt.registerTask('server', ['connect','watch']);
    
    grunt.registerTask('deploy', ['s3']);

    grunt.registerTask('default', ['server']);


    // grunt.registerTask('push', ['build','deploy']);

};