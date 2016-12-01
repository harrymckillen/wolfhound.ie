/*jslint
    white */
/* global
  grunt */
module.exports = function (grunt) {
  'use script';

  var hosts = grunt.file.readJSON('json/hosts.json');
  var siteconfig = grunt.file.readJSON('json/site.json');
  var articles = grunt.file.readJSON('json/articles.json');
  var appjs = grunt.file.readJSON('json/appjs.json');

  // Configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
          {expand: true, cwd: 'build', src: ['**/*.html', '**/*.css', '**/*.js', '**/*.php', '.htaccess']}
        ]
      }
    },
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
    sass: {
      build: {
        options: {
          style: 'compressed',
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
    jade: {
      build: {
        options: {
          pretty: false,
          data: {
            site: siteconfig,
            articles: articles,
          }
        },
        files: [
          {
            cwd: "src",
            src: ["**/*.jade", "!assets/jade/**/*.jade"],
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
      tasks: ['justBuild']
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
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      build: {
        src: [appjs.js],
        dest: 'build/assets/scripts/wolfhound.app.js'
      },
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Registered Tasks
  grunt.registerTask('justBuild',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'ngAnnotate:build',
      'uglify:build',
      'concat:build',
      'jade:build',
      'clean:tmp'
    ]);

  grunt.registerTask('localServer',
    [
      'justBuild',
      'connect',
      'watch'
    ]);

  grunt.registerTask('apacheBuild',
    [
      'justBuild',
      'watch'
    ]);

  grunt.registerTask('default',
    [
      'apacheBuild'
    ]);

  // ftp transfer
  grunt.registerTask('deploy', 'A simple task that ftp\'s stuff.', function (){

    if(grunt.option('full')){
      //pushes everything, images, etc.
      grunt.task.run([
        'ftp_push:full'
      ]);
    } else {
      //pushes just files, i.e. html, css, and js
      grunt.task.run([
        'ftp_push:justfiles'
      ]);
    }
  });
};
