/*jslint
    white */
/* global
  grunt */
module.exports = function (grunt) {
  'use script';

  var _ = require('lodash');
  var siteconfig = grunt.file.readJSON('json/site.json');
  var articles = grunt.file.readJSON('json/articles.json');
  var appjs = grunt.file.readJSON('json/appjs.json');
  var timestamp = Date.now();
  var pkg = grunt.file.readJSON('package.json');



  // Configs
  grunt.initConfig({
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/assets/', src: ['scripts/**'], dest: 'tmp/appjs/'},
          {expand: true, cwd: 'src/assets/', src: ['font/**', 'img/**'], dest: 'build/assets/'},
          {expand: true, cwd: 'src/', src: ['php/**', '.htaccess', '*.txt', 'favicon.ico'], dest: 'build/'},
          {expand: true, cwd: 'json/', src: ['articles.json'], dest: 'build/assets/json/'}
        ]
      }
    },
    karma: {
      unit: {
        files: [
          { src: [
            'build/assets/scripts/wolfhound.app.js',
            'src/assets/scripts/thirdparty/angular-1.6.7/angular-mocks.js',
            'test/**/*.js'
            ] }
        ],
        frameworks: ['jasmine'],
        port: 9999,
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
      }
    },
    sass: {
      build: {
        options: {
          outputStyle: 'compressed',
          sourcemap: 'none'
        },
        files:  [
          {
            expand: true,
            cwd: 'src/assets/sass',
            src: ['**/*.scss', "!libs/*.scss", "!components/*.scss", "!wolfhound.scss"],
            dest: 'build/assets/css',
            ext: '.css'
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          hostname: 'localhost',
          port: 4000,
          base: 'build/',
          open: true
        }
      }
    },
    pug: {
      build: {
        options: {
          pretty: false,
          data: {
            site: siteconfig,
            articles: articles,
            timestamp: timestamp
          }
        },
        files: [
          {
            cwd: "src",
            src: ["**/*.pug", "!assets/pug/**/*.pug"],
            dest: "build",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['build/', 'tmp/appjs/']
      },
      tmp: {
        src: ['tmp/appjs/']
      }
    },
    watch: {
      files: ["src/**/*", "src/.htaccess", "json/**/*"],
      tasks: ['build']
    },
    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          src: ['tmp/appjs/scripts/app/**/*.js'],
          rename: function (dest, src) {
            return src;
          }
        }]
      }
    },
    uglify: {
      build: {
        files: [{
          expand: true,
          mangle: true,
          src: appjs.js
        }]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*!' + pkg.name + ' - v' + pkg.version + ' - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      build: {
        src: [appjs.js],
        dest: 'build/assets/scripts/wolfhound.app.js'
      },
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-karma');

  // Registered Tasks
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'ngAnnotate:build',
      'uglify:build',
      'concat:build',
      'pug:build',
      'generateSiteMap',
      'generateVersionTxt',
      'clean:tmp',
      'karma:unit'
    ]);

  grunt.registerTask('localServe',
    [
      'build',
      'connect',
      'watch'
    ]);

  grunt.registerTask('serve',
    [
      'build',
      'watch'
    ]);

  grunt.registerTask('default',
    [
      'build'
    ]);

  // FTP transfer task
  grunt.registerTask('deploy', 'A simple task that ftp\'s stuff.', function (){

    var hosts = grunt.file.readJSON('json/hosts.json');
    grunt.initConfig({
      ftp_push: {
        options: {
          authKey: "live",
          host: hosts.live.remoteurl,
          dest: hosts.live.remotedir,
          port: 21,
          debug: false
        },
        full: {
          files: [
            {expand: true, cwd: 'build', src: ['**/*', '.htaccess']}
          ]
        },
        justfiles: {
          files: [
            {expand: true, cwd: 'build', src: ['**/*.html', '**/*.css', '**/*.js', '**/*.txt', '**/*.php', '**/*.json', '.htaccess']}
          ]
        },
        juststyles: {
          files: [
            {expand: true, cwd: 'build', src: ['**/*.css']}
          ]
        },
        justjs: {
          files: [
            {expand: true, cwd: 'build', src: ['**/*.js']}
          ]
        }
      }
    });

    if(grunt.option('full')){
      //pushes everything, images, etc.
      grunt.task.run([
        'ftp_push:full'
      ]);
    } else if(grunt.option('js')){
      //pushes just js files
      grunt.task.run([
        'ftp_push:justjs'
      ]);
    } else if(grunt.option('css')){
      //pushes just css
      grunt.task.run([
        'ftp_push:juststyles'
      ]);
    } else {
      //pushes just files, i.e. html, css, and js
      grunt.task.run([
        'ftp_push:justfiles'
      ]);
    }
  });

  // Create version.txt from pkg.version
  grunt.registerTask('generateVersionTxt', 'Builds the version.txt', function() {

    var version = 'Version: ' + pkg.version,
        versionFilename = './build/version.txt';

    grunt.file.write(versionFilename, version);
  });

  // Google Sitemap builder, outputs .txt format
  grunt.registerTask('generateSiteMap', 'Builds the sitemap.txt', function() {

    var sitemap = '',
        sitemapFilename = './build/sitemap.txt',
        host = 'http://www.wolfhound.ie',
        newline = '\n';

    // constructs sitemap from list of pages & articles
    _.each(siteconfig.pages, function(page){
      sitemap += host + page.link + newline;
    });

    _.each(articles, function(article){
      sitemap += host + article.link + newline;
    });

    grunt.file.write(sitemapFilename, sitemap);
  });
};
