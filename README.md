# Zenroom in React playground

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
Following this guide: https://www.dyne.org/using-zenroom-with-javascript-react-part3/

### Clone the repo

`git clone https://github.com/ivanminutillo/zenroom-react.git`

### Install dependencies

`yarn install`

### Quick & dirty hack to use .wasm in react

`cd public`
`ln -s ../node_modules/zenroom/dist/lib/zenroom.wasm .`

open the `node_modules/zenroom/dist/lib/zenroom.js` file and change from this

```
var wasmBinaryFile = 'zenroom.wasm';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}
```

to this


```
var wasmBinaryFile = '/zenroom.wasm';
if (!isDataURI(wasmBinaryFile)) {
  // wasmBinaryFile = locateFile(wasmBinaryFile);
}
```

### Launch the app
`yarn start`

Open the browser console and check the zenroom output
zencode script is located on app.js
