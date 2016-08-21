## REACT NATIVE APP WITH APOLLO CLIENT SAMPLE FOR ANDROID

1. Install dependencies:
```
npm install
```

2. Replace GraphQL Endpoint with your local IP address:
```javascript
// app/apollo.js
const networkInterface =  createNetworkInterface('http://<here>/graphql');
```

3. Start:
```
// working well on android platform only
react-native run-android
```
