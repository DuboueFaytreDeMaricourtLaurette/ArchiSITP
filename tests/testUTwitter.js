// Fichier des tests unitaires pour twitter, mais non fonctionnel ...
// import test from 'ava'

// var Twitter = require('twitter')
//
// var twitterClient = new Twitter({
//   consumer_key: 'GbhsMXiYxEurst8y9iRdTLnXY',
//   consumer_secret: 'kjGHlQNEv7BVJZkR27y5y2T4nviQfzq3m4zzKKosmZsw1w4xxk',
//   access_token_key: '865505348249047040-Ndur0ufaJrKX9sDWG2AqK6N6Cld54YT',
//   access_token_secret: 'OYTFpWH9jXkWndG08XgYkgvmOoCx0f6SHaJ5e8LAMTSq3'
// })
//
// var message = 'tweet de test unitaire'
//
// test('Example test', t => {
//   return twitterClient.post('statuses/update', {status: message}, function (error, tweet, response) {
//     if (!error) {
//       t.is(response.statusCode, '200')
//     } else {
//       console.log(error)
//       t.fail()
//     }
//   })
// })