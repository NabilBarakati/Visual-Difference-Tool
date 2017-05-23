let SpecReporter = require('jasmine-spec-reporter').SpecReporter;


exports.config = {

 onPrepare: function () {
   jasmine.getEnv().addReporter(new SpecReporter({
     spec: {
       displayStacktrace: true
     }
   }));
 },
 framework: 'jasmine',
 seleniumAddress: 'http://localhost:4444/wd/hub',
 specs: ['spec.js']
};
