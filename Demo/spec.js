visualDifferenceTool = require('../index');
assert = require('assert');
fs = require('fs-extra');
path = require('path');
rimraf = require('rimraf');


browser.visualDifferenceTool = new visualDifferenceTool({
     rootPath: './e2e/',
     autoSaveBaseline: true,
     formatImageName: '{tag}',
     verticalShift: 3,
     horizontalShift: 3
});

describe('Protractor Visual Comparison Tool', function() {
 it('takes a picture and saves baseline to baseline, the current page to currentPage, and the difference ' +
    'to the diff folder and initially have a visual difference of 0',
  function() {
    function confirmFilesExists(){
      if(fs.existsSync('./e2e/visualDiff/baseline/Boat Desktop No Differences.png') &&
         fs.existsSync('./e2e/visualDiff/currentPage/Boat Desktop No Differences.png') &&
         fs.existsSync('./e2e/visualDiff/diff/Boat Desktop No Differences.png')) {
        return true;
      }
      else {
        return false;
      }
    }
    browser.driver.get('file://' + __dirname + '/boatimg1.html');
    browser.visualDifferenceTool.compareFullPageImages('Boat Desktop No Differences')
    .then((value) => {
      assert(value === 0);
      console.log("visual difference " + value);
      assert(confirmFilesExists());
    });
 });

 it('outputs visual differences and the pictures differ by a percentage of', function() {
   browser.driver.get('file://' + __dirname + '/boatimg1.html');
   browser.visualDifferenceTool.compareFullPageImages('Boat Desktop Partial Differences')
   browser.driver.get('file://' + __dirname + '/boatimg2.html');
   browser.visualDifferenceTool.compareFullPageImages('Boat Desktop Partial Differences')
   .then((value) => {
     assert(value !== 0);
     console.log("visual difference: " + value);
     })
 });

 it('shows no difference value as the differences are maintained within the threshold', function() {
   browser.driver.get('file://' + __dirname + '/boatimg1.html');
   browser.visualDifferenceTool.verticalShift = 30;
   browser.visualDifferenceTool.horizontalShift = 30;
   browser.visualDifferenceTool.compareFullPageImages('Boat Desktop Within Threshold Differences')
   browser.driver.get('file://' + __dirname + '/boatimg2.html');
   browser.visualDifferenceTool.compareFullPageImages('Boat Desktop Within Threshold Differences')
   .then((value) => {
     assert(value <= 0.01);
     console.log("visual difference: " + value);
   })

 });

 it('throws an error when no image name is passed', function() {
   browser.driver.get('file://' + __dirname + '/boatimg1.html');
   try {
     browser.visualDifferenceTool.compareFullPageImages();
   }
   catch (error) {
       return true;
       // this is expected to throw an error so we can safely return true here
   }
 });
});
