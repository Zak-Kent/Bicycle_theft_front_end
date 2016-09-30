// Karma configuration
// Generated on Fri Aug 12 2016 13:44:49 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/angular/angular.js',
      '../bower_components/bootstrap/dist/js/bootstrap.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-cookies/angular-cookies.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-sanitize/angular-sanitize.js',
      '../bower_components/angular-touch/angular-touch.js',
      '../bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      '../bower_components/lodash/lodash.js',
      '../bower_components/angular-google-maps/dist/angular-google-maps.js',
      '../bower_components/markerclustererplus/src/markerclusterer.js',
      // '../bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js',
      // '../bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js',
      // '../bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js',
      // '../bower_components/js-rich-marker/src/richmarker.js',
      



      // '../bower_components/**/*.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../app/scripts/*.js',
      '../app/scripts/controllers/*.js',
      '../app/scripts/services/*.js',
      'spec/controllers/*.js',
      'spec/services/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
