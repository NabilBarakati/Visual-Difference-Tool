Visual Difference Tool
======================

## Installation
Add the following dependency into your project's package.json

```shell
"visual-difference-tool": "git+https://github.com/NabilBarakati/Visual-Difference-Tool"
```

### new visualDifferenceTool(options)

**Kind**: constructor

**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.rootPath | <code>string</code> | Path to the root folder where all the subfolders will be created (required) |
| options.autoSaveBaseline | <code>boolean</code> | If no baseline image is found the image is automatically copied to the baselinefolder |
| options.debug | <code>boolean</code> | Add some extra logging and always save the image difference (default:false) |
| options.formatImageName | <code>string</code> | Custom variables for Image Name (default:{tag}-{browserName}-{width}x{height}-dpr-{dpr}) |
| options.disableCSSAnimation | <code>boolean</code> | Disable all css animations on a page (default:false) |
| options.nativeWebScreenshot | <code>boolean</code> | If a native screenshot of a device (complete screenshot) needs to be taken (default:false) |
| options.horizontalShift | <code>number</code> | Acceptable horizontal shift of pixel (default: 0) |
| options.verticalShift | <code>number</code> | Acceptable verticalShift shift of pixel (default: 0) |
| options.androidOffsets | <code>object</code> | Object that will hold custom values for the statusBar, addressBar, addressBarScrolled and toolBar |
| options.iosOffsets | <code>object</code> | Object that will hold the custom values for the statusBar, addressBar, addressBarScrolled and toolBar |

**Example**
```js
// default
const visualDifferenceTool = require('visual-difference-tool');
browser.visualDifferenceTool = new visualDifferenceTool({
      rootPath: '/path/to/screenshots/'
});
// auto save baseline
const visualDifferenceTool = require('visual-difference-tool');
browser.visualDifferenceTool = new visualDifferenceTool({
      rootPath: '/path/to/screenshots/',
      autoSaveBaseline: true
});
// change filename format to only tag.png
const visualDifferenceTool = require('visual-difference-tool');
browser.visualDifferenceTool = new visualDifferenceTool({
      rootPath: '/path/to/screenshots/',
      formatImageName: '{tag}'
});
// set custom vertical and horizontal thershold to 3px (allows for a slight variance in pixel location between 2 pictures)
// Any pixel that falls within the threshold range will appear in orange instead of red
const visualDifferenceTool = require('visual-difference-tool');
browser.visualDifferenceTool = new visualDifferenceTool({
      rootPath: '/path/to/screenshots/',
      verticalShift: 3;
      horizontal: 3;
});
```

## compareFullPageImages(tag) ⇒ <code>Promise</code>
Compares full page images of the screen

**Kind**: global function

**Returns**: <code>Promise</code> - The image has been saved when the promise is resolved, it will also return the percentage of pixels that are different, so that we can decide to fail the test or not accordingly.

**Access:** public

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>string</code> | The tag that is used for image name |

**Example**
```js
browser.visualDifferenceTool.compareFullPageImages('imageA');

// If you want to see the difference percentage, do the following:
browser.visualDifferenceTool.compareFullPageImages('imageA')
.then((value) => console.log("difference percentage: " + value));
```

##Directory structure

Before:
```text
path
└── to
    └── screenshots
```

After (with default options):
```text
path
└── to
    └── screenshots
        ├── baseline
        │   └── imageA-chrome-1280x1024-dpr-1.png
        ├── diff
        │   └── imageA-chrome-1280x1024-dpr-1.png
        └── currentPage
            ├── tempFullScreen  // tempFullScreen is the folder that stores the cropped screenshots
            │   ├── imageA-1-chrome-1280x1024-dpr-1.png
            |   └── imageA-2-chrome-1280x1024-dpr-1.png   
            └── imageA-chrome-1280x1024-dpr-1.png  // this is the composed full page screenshot
```
## Credits
- Taking fullscreen screenshot is from [Protractor Image Comparison](https://github.com/wswebcreation/protractor-image-comparison)
- Comparison is using [Blink Diff](http://yahoo.github.io/blink-diff/)

Try Our Demo!
======================

## Setup

- Follow the "Setup" instructions found here [Protractor](http://www.protractortest.org/#/)
- From the project folder run ``` npm install ```
- From terminal, cd into the Demo folder and run ```protractor conf.js ```
- Also note that any pixels that fall into the verticalShift || horizontalShift will appear as orange and does not count as part of the difference value
- You have completed the demo :)
- The results folder contains some samples
## Interested in Mobile-View Testing?
- insert the following line ``` browser.driver.manage().window().setSize(700, 720); before compareFullPageImages() gets called

