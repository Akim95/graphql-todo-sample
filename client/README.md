## REACT NATIVE APP WITH APOLLO CLIENT SAMPLE FOR ANDROID

#### Install dependencies:
```
cd todoAppReactNative

// install
yarn install or
npm install
```

#### Replace GraphQL Endpoint with your local IP address:
```javascript
// app/apollo.js
const networkInterface =  createNetworkInterface('http://<here>/graphql');
```

#### Start:
```
react-native run-android or
react-native run-ios
```