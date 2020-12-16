# Responder.js 🚀
<p>
  <a href="https://npmcharts.com/compare/@casualcoders/responder?minimal=true"><img src="https://img.shields.io/npm/dm/@casualcoders/responder?style=plastic" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@casualcoders/responder"><img src="https://img.shields.io/npm/v/@casualcoders/responder?style=plastic" alt="Version"></a>
  <a href="https://github.com/casualcoders/responder/blob/master/license.txt"><img src="https://img.shields.io/github/license/casualcoders/responder?style=plastic" alt="License"></a>
  <a href="https://bundlephobia.com/result?p=@casualcoders/responde">
    <img src="https://img.shields.io/bundlephobia/minzip/@casualcoders/responder?style=plastic" alt="Size">
    <img src="https://img.shields.io/bundlephobia/min/@casualcoders/responder?style=plastic" alt="Size">
  </a>
</p>

This package allows you to run as many js functions as you like at breakpoints you specify without the hassle of matchMedia re-running functions for each breakpoint you want the function to be active on. We ensure a function is only run when entering viewport (or page load) or exiting a viewport. This has all been built using typescript, tested and then compiled for compatibility.

**_WARNING_**: This requires the browser to function, do not use if your code is running server side as we will not have access to the matchMedia API.

## Setup

```bash
npm install @casualcoders/responder
```

### Creation

You can use this two ways, by creating responders through our factory, or by creating them yourself.

#### Factory Creation

```javascript
import ResponderFactory from "@casualcoders/responder";

ResponderFactory = new ResponderFactory(breakpointConfig)
```

Example breakpointConfig:

```javascript
[
  { label: 'small', min: 0, max: 575 },
  { label: 'mobile', min: 576, max: 767 },
  { label: 'tablet', min: 768, max: 991 },
  { label: 'desktop', min: 992, max: 1199 },
  { label: 'big', min: 1200, max: 9999 }
]
```

If you only require one Responder you can call:

```javascript
const responder =  ResponderFactory.createResponder(
  breakpointArray,                    //Required
  callbackToRunOnEntry,               //Optional
  callbackToRunOnExit,                //Optional
  shouldRunExitOnSetupIfMatchFails    //Optional default = true
)
```

If you require multiple Responders you can define them by calling:

```javascript
const responders = ResponderFactory.createResponders(responderConfigs)
```

Example functions to run

```javascript
const firstExampleCallbackToRunOnEntry = () => {
  console.log("firstExampleCallbackToRunOnEntry", "small", "medium");
};

const firstExampleCallbackToRunOnExit = () => {
  console.log("firstExampleCallbackToRunOnExit", "small", "medium");
};

const secondExampleCallbackToRunOnEntry = () => {
  console.log("secondExampleCallbackToRunOnEntry", "desktop");
};

const secondExampleCallbackToRunOnExit = () => {
  console.log("secondExampleCallbackToRunOnExit", "big");
};

const thirdExampleCallbackToRunOnEntry = () => {
  console.log("thirdExampleCallbackToRunOnEntry", "big");
};

const thirdExampleCallbackToRunOnExit = () => {
  console.log("thirdExampleCallbackToRunOnExit", "desktop");
};
  
```

Example responder Configs:

```javascript
[
  {
    viewports: ["small", "medium"],             //Required
    enterFn: firstExampleCallbackToRunOnEntry,  //Optional
    exitFn: firstExampleCallbackToRunOnExit,    //Optional
    shouldRunExitOnSetupIfMatchFails: false     //Optional default = true
  },
  {
    viewports: ["desktop"],
    enterFn: secondExampleCallbackToRunOnEntry,
    exitFn: secondexampleCallbackToRunOnExit,
  },
  {
    viewports: ["big"],
    enterFn: thirdExampleCallbackToRunOnEntry,
    exitFn: thirdExampleCallbackToRunOnExit,
  }
]
```

#### Direct Creation

```javascript
import { Responder } from "@casualcoders/responder";

responder = new Responder(
  viewportConfig,                   //Required
  viewportsToRespondTo,             //Required
  callbackToRunOnEntry,             //Optional
  callbackToRunOnExit,              //Optional
  shouldRunExitOnSetupIfMatchFails  //Optional default = true
)
```

Example viewportConfig array:

```javascript
[
  { label: 'small', min: 0, max: 575 },
  { label: 'mobile', min: 576, max: 767 },
  { label: 'tablet', min: 768, max: 991 },
  { label: 'desktop', min: 992, max: 1199 },
  { label: 'big', min: 1200, max: 9999 }
]
```

Example viewportsToRespondTo array:

```javascript
[
  'small',
  'medium'
]
```

### Initialisation

After being created, you need to run .setup() for each of the responders **inside the browser** when you wish for the responsive js to begin. This method aggregates the viewports and sets up the matchMedia listeners. This can be done directly if you only created one:

```javascript
responder.setup()
```

Or by looping through them:

```javascript
for (let i = 0; i < responders.length; i++) {
  responders[i].setup();
}
```

## How to contribute

If you wish to contribute there are several ways to do so. You can raise a feature request or a bug report as an issue on Github, or if you would like to contribute to the repository you can find our guidelines in the [wiki](https://github.com/casualcoders/responder/wiki/how-to-contribute).

### Running tests

```bash
npm run test
```

or a watch task is also available:

```bash
npm run watch
```
