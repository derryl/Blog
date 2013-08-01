'use strict';

module.exports = function(grunt) {

    var jsCSSheaders = {
        'Vary': 'Accept-Encoding', 'Cache-Control': 'max-age=3600000'
    };

    var config = {

        source: 'app',    // source files
        local:  'public', // build location for dev
        dist:   'dist',   // build location for distribution

        // S3 Bucket locations
        staging:    'dev.drryl.com',
        production: 'www.drryl.com',
        media:      'media.drryl.com',

        // LiveReload default is 35729, customizing this avoids
        // "Port in use" conflicts from the standalone app
        liveReloadPort: 8788,

        aws: grunt.file.readJSON('config/grunt-aws.json')
                            
    };

    grunt.initConfig({

        src:   config.source,
        local: config.local,
        dist:  config.dist,
        aws: config.aws,

        clean: {
            local: ['<%= local %>'],
            dist:  ['<%= dist %>'],
            postbuild: [
                '<%= local %>/styles',     '<%= dist %>/styles',
                '<%= local %>/vendor',     '<%= dist %>/vendor',
                '<%= local %>/coffee',     '<%= dist %>/coffee',
                '<%= local %>/temp',       '<%= dist %>/temp',
                '<%= local %>/master.css', '<%= dist %>/master.css'
            ]
        },

        // Compiles all of my Jekyll source files, turning
        // Markdown & HTML snippets into fully-rendered templates
        jekyll: {
            build: { 
                src: '<%= src %>',
                dest: '<%= local %>'
            }
        },

        // Copy * from public to dist, for production builds
        copy: {
            dist: {
                files: [{ 
                    expand: true,
                    src: ['**','!**/*.html','!**/*.css','!**/*.js','!**/img/portfolio/**','!**/img/old/**','!**/fonts/**'],
                    cwd: '<%= local %>', 
                    dest: '<%= dist %>'
                }]
            }
        },

        // Serve /public on port 7000
        connect: {
            server: {
                options: {
                    port: 7000,
                    base: '<%= local %>'
                }
            }
        },

        // Whenever a source file changes,
        // kick off a dev build and trigger LiveReload
        watch: {
            files: ['<%= src %>/**'],
            tasks: ['build:dev'],
            options: { livereload: true }
        },

        concat: {
            // Concat all global JavaScript (libraries, core, etc.)
            libs: {
                src: [
                    '<%= local %>/vendor/zepto.min.js',
                    '<%= local %>/vendor/prettify.js',
                    '<%= local %>/vendor/hiless.js'
                    // '<%= local %>/vendor/highlight.pack.js'
                ], dest: '<%= local %>/temp/vendor.js'
            },
            app: {
                src: [
                    '<%= local %>/temp/vendor.js',
                    '<%= local %>/temp/main.js'
                ], dest: '<%= local %>/app.js'
            }
        },

        // LESS -> CSS
        less: {
            master: {
                files: {
                    '<%= local %>/master.css': '<%= local %>/styles/master.less'
                }
            }
        },

        // Coffee -> Javascript
        coffee: {
            app: {
                files: {
                    '<%= local %>/temp/main.js': '<%= local %>/coffee/main.coffee'
                }
            }
        },

        // Minify CSS
        cssmin: {
            site: {
                expand: true,
                cwd: '<%= local %>',
                src: ['master.css'],
                dest: '<%= local %>',
                ext: '.min.css'
            }
        },

        replace: {
            special_chars: {
                src: ['<%= local %>/**/*.html'],
                overwrite: true,
                replacements: [
                    { from: /–/g, to: '&mdash;'},
                    { from: /…/g, to: '&hellip;'}
                ]
            },
            cloudfront_links: {
                src: ['<%= local %>/*.css'],
                overwrite: true,
                replacements: [{
                    from: /\/img/g,
                    to: 'http://d2hi2nhy60x4d5.cloudfront.net/img'
                }]
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
                    cwd: '<%= local %>',
                    src: '{,*/}*.html',
                    dest: '<%= local %>'
                }]
            }
        },

        // Uglify my JS files
        uglify: {
            dist: {
                files: {
                    '<%= local %>/app.js': ['<%= local %>/app.js']
                }
            }
        },

        aws_s3: {
            options: {
                accessKeyId:     '<%= aws.key %>',
                secretAccessKey: '<%= aws.secret %>',
                region: 'us-east-1',
                concurrency: 15
            },
            staging_gzipped: {
                options: { 
                    bucket: 'dev.drryl.com',
                    params: { 
                        ContentEncoding: 'gzip',
                        CacheControl: 'max-age=60'
                    }
                },
                files: [{ expand: true, cwd: 'dist/', src: ['**/*.html','**/*.css','**/*.js'], dest: ''}]
            },
            staging_others: {
                options: { 
                    bucket: 'dev.drryl.com',
                    params: { CacheControl: 'max-age=60'}
                },
                files: [{ expand: true, cwd: 'dist/', src: ['**','!**/img/**','!**/*.html','!**/*.css','!**/*.js'], dest: ''}]
            },
            prod_gzipped: {
                options: { 
                    bucket: 'www.drryl.com',
                    params: { 
                        ContentEncoding: 'gzip',
                        CacheControl: 'max-age=3600' // text files cached for 1 hour
                    }
                },
                files: [{ expand: true, cwd: 'dist/', src: ['**/*.html','**/*.css','**/*.js'], dest: ''}]
            },
            prod_others: {
                options: { 
                    bucket: 'www.drryl.com',
                    params: { CacheControl: 'max-age=604800' } // everything else cached for 1 week
                },
                files: [{ expand: true, cwd: 'dist/', src: ['**','!**/img/**','!**/*.html','!**/*.css','!**/*.js'], dest: ''}]
            },
            media: {
                options: {
                    bucket: 'media.drryl.com'
                    // d2hi2nhy60x4d5.cloudfront.net
                },
                files: [{ expand: true, cwd: 'dist/', src: ['img/**'], dest: ''}]
            }
        },

        compress: {
            html: { options: { mode: 'gzip' }, expand: true, cwd: 'public', dest: 'dist', src: ['**/*.html'], ext: '.html' },
            css:  { options: { mode: 'gzip' }, expand: true, cwd: 'public', dest: 'dist', src: ['**/*.css'], ext: '.min.css' },
            js:   { options: { mode: 'gzip' }, expand: true, cwd: 'public', dest: 'dist', src: ['**/*.js'], ext: '.js' }
        }

    }); // end .initConfig()


    // &mdash;

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.loadNpmTasks('grunt-contrib-compress'); // gzipping files
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-shell');
    // grunt.loadNpmTasks('grunt-s3');
    // Trying alternate S3 library
    grunt.loadNpmTasks('grunt-aws-s3');



    // Default task(s).
    grunt.registerTask('build:dev', [
        'clean:local',
        'jekyll',
        'less',
        'coffee',
        'concat',
        'cssmin',
        'replace:special_chars',
        'clean:postbuild'
    ]);

    grunt.registerTask('build:prod', [
        'build:dev',
        'clean:dist',
        'replace:cloudfront_links',
        'copy:dist',
        'htmlcompressor',
        'uglify',
        'compress'
    ]);

    grunt.registerTask( 'server',  [ 'connect', 'watch' ]);

    grunt.registerTask( 's3_staging', ['aws_s3:staging_gzipped', 'aws_s3:staging_others']);
    grunt.registerTask( 's3_prod', ['aws_s3:prod_gzipped', 'aws_s3:prod_others']);
    
    grunt.registerTask( 'pushdev',  [ 'build:prod', 's3_staging' ]);
    grunt.registerTask( 'pushprod', [ 'build:prod', 's3_prod' ]);
    grunt.registerTask( 'media',[ 'build:prod', 'aws_s3:media' ]);

    grunt.registerTask( 'default', [ 'build:dev', 'server' ]);


    // grunt.registerTask('push', ['build','deploy']);

};