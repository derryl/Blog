'use strict';


module.exports = function(grunt) {

    var jsCSSheaders = {
        'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=3600000'
    };

    var drryl_config = {
        source: 'app',    // source files
        app:    'public', // build location for dev
        dist:   'dist',   // build location for distribution

        dev_bucket:  'dev.drryl.com',
        prod_bucket: 'www.drryl.com',
    };

    grunt.initConfig({

        d: drryl_config,

        aws: grunt.file.readJSON('config/grunt-aws.json'),

        clean: {
            prep: [
                '<%= d.app %>',
                '<%= d.dist %>'
            ],
            post: [
                '<%= d.app %>/styles',     '<%= d.dist %>/styles',
                '<%= d.app %>/vendor',     '<%= d.dist %>/vendor',
                '<%= d.app %>/coffee',     '<%= d.dist %>/coffee',
                '<%= d.app %>/temp',       '<%= d.dist %>/temp',
                '<%= d.app %>/master.css', '<%= d.dist %>/master.css'
            ]
        },

        jekyll: {
            build: { 
                src: '<%= d.source %>',
                dest: '<%= d.app %>'
            }
        },

        copy: {
            dist: {
                files: [{ 
                    expand: true,
                    src: ['**'],
                    cwd: '<%= d.app %>', 
                    dest: '<%= d.dist %>'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 7000,
                    base: '<%= d.app %>'
                }
            }
        },

        watch: {
            files: ['<%= d.source %>/**'],
            options: { livereload: true },
            tasks: ['build:dev']
        },

        concat: {
            // Concat all global JavaScript (libraries, core, etc.)
            libs: {
                src: [
                    '<%= d.app %>/vendor/zepto.min.js',
                    '<%= d.app %>/vendor/prettify.js'
                    // '<%= d.app %>/vendor/highlight.pack.js'
                ], dest: '<%= d.app %>/temp/vendor.js'
            },
            app: {
                src: [
                    '<%= d.app %>/temp/vendor.js',
                    '<%= d.app %>/temp/main.js'
                ], dest: '<%= d.app %>/app.js'
            }
        },

        less: {
            master: {
                files: {
                    '<%= d.app %>/master.css': '<%= d.app %>/styles/master.less'
                }
            }
        },

        coffee: {
            app: {
                files: {
                    '<%= d.app %>/temp/main.js': '<%= d.app %>/coffee/main.coffee'
                }
            }
        },

        // Minify CSS
        cssmin: {
            site: {
                expand: true,
                cwd: '<%= d.app %>',
                src: ['master.css'],
                dest: '<%= d.app %>',
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
                    cwd: '<%= d.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= d.dist %>'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= d.dist %>/app.js': ['<%= d.dist %>/app.js']
                }
            }
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
                    { src: 'dist/*', dest: '', gzip: true },
                    { src: 'dist/img/*', dest: 'img' }
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
    grunt.registerTask('build:dev', [
        'clean:prep',
        'jekyll',
        'less',
        'coffee',
        'concat',
        'cssmin',
        'clean:post'
    ]);

    grunt.registerTask('build:prod', [
        'build:dev',
        'copy:dist',
        'htmlcompressor',
        'uglify'
    ]);

    grunt.registerTask( 'server',  [ 'connect', 'watch' ]);
    
    grunt.registerTask( 'pushdev', [ 'build:prod', 's3:dev' ]);

    grunt.registerTask( 'default', [ 'build', 'server' ]);


    // grunt.registerTask('push', ['build','deploy']);

};