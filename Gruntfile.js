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
                    src: ['**','!**/*.html','!**/*.css','!**/*.js','!**/img/portfolio/**','!**/img/old/**','!**/fonts/**'],
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

        replace: {
            fix_mdash: {
                src: ['<%= d.app %>/**/*.html'],
                overwrite: true,
                replacements: [{
                    from: /–/g,
                    to: '&mdash;'
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
                    cwd: '<%= d.app %>',
                    src: '{,*/}*.html',
                    dest: '<%= d.app %>'
                }]
            }
        },

        // Uglify my JS files
        uglify: {
            dist: {
                files: {
                    '<%= d.app %>/app.js': ['<%= d.app %>/app.js']
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
                    params: { ContentEncoding: 'gzip' }
                },
                files: [
                    { expand: true, cwd: 'dist/', src: ['**/*.html','**/*.css','**/*.js'], dest: ''}
                ]
            },
            staging_others: {
                options: {
                    bucket: 'dev.drryl.com'
                },
                files: [
                    { expand: true, cwd: 'dist/', src: ['**','!**/img/portfolio/**','!**/img/old/**','!**/*.html','!**/*.css','!**/*.js'], dest: ''}
                ]
            },
            prod_gzipped: {
                options: {
                    bucket: 'www.drryl.com',
                    params: { ContentEncoding: 'gzip' }
                },
                files: [
                    { expand: true, cwd: 'dist/', src: ['**/*.html','**/*.css','**/*.js'], dest: ''}
                ]
            },
            prod_others: {
                options: {
                    bucket: 'www.drryl.com'
                },
                files: [
                    { expand: true, cwd: 'dist/', src: ['**','!**/img/portfolio/**','!**/img/old/**','!**/*.html','!**/*.css','!**/*.js'], dest: ''}
                ]
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
        'clean:prep',
        'jekyll',
        'less',
        'coffee',
        'concat',
        'cssmin',
        'replace',
        'clean:post'
    ]);

    grunt.registerTask('build:prod', [
        'build:dev',
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

    grunt.registerTask( 'default', [ 'build:dev', 'server' ]);


    // grunt.registerTask('push', ['build','deploy']);

};