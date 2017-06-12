import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Example test', t => {
  return client.getPromise('https://www.googleapis.com/youtube/v3/search?q=rick&part=snippet&key=AIzaSyDLAMBpwv-YF3aZEif6RBtdMem8YVtFZSY')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
