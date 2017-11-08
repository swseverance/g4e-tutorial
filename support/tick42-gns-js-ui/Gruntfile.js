/*
 Generic Grunt file.

 Works with the following project structure.
 /library  - Your source files. Can be configured via the 'sources' variable.
 /tests  - Should contain a QUnit test suite. The tests are run against a web server (port configurable).
 /target - Folder created by the build which contains:
 - <yourmodule>.js - Compiled source (file name taken from package.json).
 - <yourmodule>.map - Source map for your module.
 - <yourmodule>.min.js - Minified source.


 "devDependencies": {
 "blanket": "^1.1.6",
 "browserify-versionify": "^1.0.4",
 "grunt": "^0.4.5",
 "grunt-browserify": "^3.3.0",
 "grunt-cli": "^0.1.0",
 "grunt-contrib-clean": "^0.6.0",
 "grunt-contrib-connect": "^0.9.0",
 "grunt-contrib-jshint": "^0.11.0",
 "grunt-contrib-qunit": "^0.5.2",
 "grunt-contrib-uglify": "^0.6.0",
 "grunt-contrib-watch": "^0.6.1",
 "grunt-exorcise": "^1.0.0",
 "phantomjs": "^1.9.12",
 "qunitjs": "^1.15.0",
 "uglifyify": "^3.0.1"
 }

*/


//var sources = 'library/**/*.js'
var gns = "library/js/gns/*js"
//var test_server_port = 8000
//var init_code = "//<%= pkg.name %> version <%= pkg.version %>"

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



        //Runs a task whenever some of the source files change
        watch: {
            files: ["library/**/*.js"],//, "library/**/*.html"],
            tasks: ['default'],
        },

        browserify: {
            beautiful:{
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    //banner: init_code,
                    transform:[['browserify-versionify', {global:true}]]
                },
                files: {
                    "target/<%= pkg.name %>.js": ["library/js/main/*.js", gns],
                    "target/log/<%= pkg.name %>-log.js": ["library/js/log/*.js"],
                    "target/default/<%= pkg.name %>-default.js": ["library/js/default/*.js", gns],
                    "target/toast/<%= pkg.name %>-toast.js": ["library/js/toast/*.js", gns]
                }
            }/*,
            ugly:{
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    //banner: init_code,
                    transform:[['browserify-versionify', {global:true}], ['uglifyify', {global:true}]]
                },
                files: {
                    "target/<%= pkg.name %>.min.js": [sources]
                }
            }*/
        }

    });


    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exorcise');
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Default task(s).
    grunt.registerTask('default', ['browserify']);

};
