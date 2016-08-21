## REACT NATIVE APP WITH APOLLO CLIENT SAMPLE FOR ANDROID

#### Install dependencies:
```
npm install
```

#### Replace GraphQL Endpoint with your local IP address:
```javascript
// app/apollo.js
const networkInterface =  createNetworkInterface('http://<here>/graphql');
```

#### Start:
```
// working well on android platform only
react-native run-android
```
