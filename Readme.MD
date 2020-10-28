# Responder.js 🚀

Run as many responsive js functions as you want without the hassle of dealing with matchMedia(). We do all the work under the hood by aggregating breakpoints and using the matchMedia() API from the browser. Plus its all tested and polyfilled for compatibility, just see for yourself :)

**_WARNING_**: This requires the browser to function, do not use if your code is running server side.

## Setup

```bash
npm install @casualcoders/responder
```

You can use this two ways, by creating responders through our factory, or by creating them yourself.

### Factory Creation

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
ResponderFactory.createResponder(breakpointArray, callbackToRunOnEntry, callbackToRunOnExit)
```

If you require multiple Responders you can define them by calling:

```javascript
ResponderFactory.createResponders(responderConfigs)
```

Example responder Configs:

```javascript
[
    {
        ['small', 'medium'],
        exampleCallbackToRunOnEntry
    },
    {
        ['large'],
        secondExampleCallbackToRunOnEntry,
        exampleCallbackToRunOnExit
    },
    {
        ['xl'],
        null,
        secondExampleCallbackToRunOnExit
    }
]
```

### Direct Creation

```javascript
import { Responder } from "@casualcoders/responder";

Responder = new Responder(viewportsToRespondTo, viewportConfig, callbackToRunOnEntry, callbackToRunOnExit)
```

Example viewportsToRespondTo array:

```javascript
[
    'small',
    'medium'
]
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

## Running tests

```bash
npm run test
```

or a wash task is also available:

```bash
npm run watch
```

***Learn more about our coding standards in our [WIKI](https://github.com/casualcoders/responder/wiki/Coding-Standards)***
