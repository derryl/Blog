'use strict';

module.exports = function(grunt) {

    var jsCSSheaders = {
        'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=3600000'
    };

    var d = {

        source: 'app',    // source files
        app:    'public', // build location for dev
        dist:   'dist',   // build location for distribution

        dev_bucket:  'dev.drryl.com',
        prod_bucket: 'www.drryl.com',

        // LiveReload default is 35729, customizing this avoids
        // "Port in use" conflicts from the standalone app
        liveReloadPort: 8788
                            
    };

    grunt.initConfig({

        d: d,

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

        // Compiles all of my Jekyll source files, turning
        // Markdown & HTML snippets into fully-rendered templates
        jekyll: {
            build: { 
                src: '<%= d.source %>',
                dest: '<%= d.app %>'
            }
        },

        // Copy * from public to dist, for production builds
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

        // Serve /public on port 7000
        connect: {
            server: {
                options: {
                    port: 7000,
                    base: '<%= d.app %>'
                }
            }
        },

        // Whenever a source file changes,
        // kick off a dev build and trigger LiveReload
        watch: {
            files: ['<%= d.source %>/**'],
            tasks: ['build:dev'],
            options: { livereload: true }
        },

        concat: {
            // Concat all global JavaScript (libraries, core, etc.)
            libs: {
                src: [
                    '<%= d.app %>/vendor/zepto.min.js',
                    '<%= d.app %>/vendor/prettify.js',
                    '<%= d.app %>/vendor/hiless.js'
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

        // LESS -> CSS
        less: {
            master: {
                files: {
                    '<%= d.app %>/master.css': '<%= d.app %>/styles/master.less'
                }
            }
        },

        // Coffee -> Javascript
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

        // Compress HTML templates (strips whitespace, comments, etc.)
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

        // Uglify my JS files
        uglify: {
            dist: {
                files: {
                    '<%= d.dist %>/app.js': ['<%= d.dist %>/app.js']
                }
            }
        },

        // Deployment tasks
        s3: {
            options: {
                key:    '<%= aws.key %>',
                secret: '<%= aws.secret %>',
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
                    { src: 'dist/posts/*', dest: 'posts', gzip: true },
                    { src: 'dist/reading/*', dest: 'reading', gzip: true },
                    { src: 'dist/about/*', dest: 'about', gzip: true },
                    { src: 'dist/img/*', dest: 'img' }
                ]
            },

            prod: {
                options: {
                    encodePaths: true,
                    bucket: 'www.drryl.com',
                    access: 'public-read'
                },
                upload: [
                    { src: 'dist/*', dest: '', gzip: true },
                    { src: 'dist/posts/index.html', dest: 'posts', gzip: true },
                    { src: 'dist/reading/index.html', dest: 'reading', gzip: true },
                    { src: 'dist/about/index.html', dest: 'about', gzip: true },
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
    
    grunt.registerTask( 'pushdev',  [ 'build:prod', 's3:dev' ]);
    grunt.registerTask( 'pushprod', [ 'build:prod', 's3:prod' ]);

    grunt.registerTask( 'default', [ 'build:dev', 'server' ]);


    // grunt.registerTask('push', ['build','deploy']);

};