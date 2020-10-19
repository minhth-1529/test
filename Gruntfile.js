module.exports = function (grunt) {
    // variable
    var lang, gruntData, name, storefront, customName;
    lang = 'en';
    name = 'lexus';
    customName = 'toyota';
    storefront = 'storefront';
    gruntData = {
        appPublic: '../cashtech/public/'
    };

    // include plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-nunjucks-2-html');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');

    // init plugin
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/images/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'assets/images/'
                    }
                ]
            },
            options: {
                cache: true
            }
        },
        // live reload
        browserSync: {
            bsFiles: {
                src: ['assets/css/*.css', 'html/**/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './',
                    directory: true
                }
            }
        },
        // watch file
        watch: {
            options: {
                forever: false,
                reload: true,
                livereload: true
            },
            less: {
                files: ['assets/less/**/*.less'],
                tasks: ['less:frontend']
            },
            nunjucks: {
                files: ['nunjucks/**/*.html'],
                tasks: 'nunjucks'
            },
            javascript: {
                files: ['js/*.js'],
                tasks: 'concat'
            }
        },
        // template html
        nunjucks: {
            options: {
                noCache: true,
                configureEnvironment: function (env, nunjucks) {
                    env.addGlobal('lang', lang);
                    env.addGlobal(
                        'dependencies',
                        grunt.file.readJSON('lang/dependencies.json')
                    );
                },
                preprocessData: function (data) {
                    var page = require('path').basename(this.src[0], '.html');
                    var result = {
                        page: page,
                        data: data
                    };
                    return result;
                },
                data: grunt.file.readJSON('lang/' + lang + '/nunjucks.json')
            },
            render: {
                files: [
                    {
                        expand: true,
                        cwd: 'nunjucks/',
                        src: '*.html',
                        dest: 'html/',
                        ext: '.html'
                    }
                ]
            }
        },
        // compile less
        less: {
            frontend: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({
                            browsers: ['last 2 versions']
                        })
                    ],
                    ieCompat: true,
                    yuicompress: false,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapBasepath: 'assets/css/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/less/',
                        src: 'styled.less',
                        dest: 'assets/css/',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'assets/less/',
                        src: 'styled.less',
                        dest: gruntData.appPublic + 'css/',
                        ext: '.css'
                    }
                ]
            },
        },
        // copy file to hybris
        sync: {
            frontend: {
                files: [
                    {
                        cwd: './assets/',
                        src: [
                            'fonts/**',
                            'images/**',
                        ],
                        dest: gruntData.appPublic,
                    }
                ]
            },
        },
        // compress file js
        concat: {
            options: {
                separator: ';',
                stripBanners: {
                    block: true,
                    line: true
                },
                process: false
            },
            dist: {
                src: ['js/jquery-3.2.1.min.js','js/wow.min.js', 'js/*.js', 'js/function.js'],
                dest: './assets/js/functions.js'
            }
        },
        // minify js
        uglify: {
            options: {
                mangle: false,
                beautify: false,
                preserveComments: 'license',
                hoist_funs: false,
                compress: {
                    hoist_funs: false
                }
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.js','!ootb/**','!jquery-3.2.1.min.js'],
                        dest: './assets/js/',
                        cwd: './assets/js/'
                    }
                ]
            }
        },
        replace: {
            makethisforme: {
                src: [gruntData.replaceImgLinks],
                overwrite: true,
                replacements: [
                    {
                        from: '../../../node_modules/bootstrap/less/variables',
                        to: '../../../../lib/bootstrap-3.3.7/less/variables'
                    },
                    {
                        from: '../../../node_modules/bootstrap/less/mixins',
                        to: '../../../../lib/bootstrap-3.3.7/less/mixins'
                    },
                    {
                        from: '../../assets/images',
                        to: '../images'
                    }
                ]
            }
        }
    });

    // run task
    grunt.registerTask('default', ['nunjucks', 'browserSync', 'watch']);
    grunt.registerTask('copy', ['imagemin', 'uglify', 'sync', 'replace', 'less:hybirs']);

};
