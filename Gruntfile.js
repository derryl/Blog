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
                'dist/master.css'
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

        htmlcompressor: {
            dist: {
                options: {
                    type: 'html',
                    preserveServerScript: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '{,*/}*.html',
                    dest: 'dist'
                }]
            }
        },

        jekyll: {
            build: { src: 'app', dest: 'dist' }
        },

        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= aws.bucket %>',
                access: 'public-read'
            },

            dev: {
                options: {
                    encodePaths: true,
                    bucket: 'dev.drryl.com',
                    access: 'public-read'
                },
                upload: [
                    { src: 'dist/*', dest: '' }
                    // { src: 'dist/img/*', dest: 'img' },
                ]
            },

            fonts: {
                options: {
                    encodePaths: true,
                    bucket: 'dev.drryl.com',
                    access: 'public-read'
                },
                upload: [
                    {
                        "src": "dist/fonts/*.ttf",
                        "dest": "fonts",
                        "gzip": true,
                        "headers": {
                            "Cache-Control": "max-age=2629746000",
                            "Content-Type": "application/x-font-ttf"
                        }
                    },{
                        "src": "dist/fonts/*.otf",
                        "dest": "fonts",
                        "gzip": true,
                        "headers": {
                            "Cache-Control": "max-age=2629746000",
                            "Content-Type": "font/opentype"
                        }
                    },{
                        "src": "dist/fonts/*.woff",
                        "dest": "fonts",
                        "gzip": true,
                        "headers": {
                            "Cache-Control": "max-age=2629746000",
                            "Content-Type": "application/font-woff"
                        }
                    },{
                        "src": "dist/fonts/*.svg",
                        "dest": "fonts",
                        "gzip": true,
                        "headers": {
                            "Cache-Control": "max-age=2629746000",
                            "Content-Type": "image/svg+xml"
                        }
                    }
                ]
            }

        } // end s3

    }); // end .initConfig()


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jekyll');
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
        'htmlcompressor',
        'clean:post'
    ]);

    grunt.registerTask('server', ['connect','watch']);
    
    // grunt.registerTask('deploy', ['s3']);
    grunt.registerTask( 'pushdev', [ 's3:dev' ]);

    grunt.registerTask('default', ['server']);


    // grunt.registerTask('push', ['build','deploy']);

};