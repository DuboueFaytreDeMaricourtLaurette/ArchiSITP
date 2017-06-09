const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var promise = require('node-rest-client-promise').Client()
var Translate = require('@google-cloud/translate')({
  key: 'AIzaSyBngKK7gcXWaJVV3SmCZ40UmxFWCljOQx8'
})

var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'c85d72908393430b8a3d191303a44cb8',
  clientSecret: '044eaee7b5144caebaafc1b370f31828'

})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

var clientOWM = require('node-rest-client-promise').Client()

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  var msgTab = msg.content.split(' ')
  if (msgTab[0] === 'youtube:') {
    var message = ''
    for (var i = 1; i < msgTab.length; i++) {
      message = message + ' ' + msgTab[i]
    }

    promise.getPromise('https://www.googleapis.com/youtube/v3/search?q=' + message + '&maxResults=3&part=snippet&key=AIzaSyDLAMBpwv-YF3aZEif6RBtdMem8YVtFZSY')
      .catch((error) => {
        throw error
      })
      .then((res) => {
        console.log(res.data.items)
        for (var i = 0; i < res.data.items.length; i++) {
          var object = res.data.items[i]
          if (object.id.kind === 'youtube#channel') {
            var channelId = object.id.channelId
            var url2 = 'https://www.youtube.com/channel/' + channelId
            msg.channel.sendMessage(url2)
          } else if (object.id.kind === 'youtube#video') {
            var videoId = object.id.videoId
            var url = 'https://www.youtube.com/watch?v=' + videoId
            msg.channel.sendMessage(url)
          }
        }
        console.log(res.response.statusCode)
      })
  }

  msgTab = msg.content.split(' ')

  if (msgTab[0] === 'weather:') {
    var messageOWM = ''
    for (var j = 1; j < msgTab.length; j++) {
      messageOWM = messageOWM + ' ' + msgTab[j]
    }

    var newMessageOWM = messageOWM.split(', ')

    var city = newMessageOWM[0]
    var country = newMessageOWM[1]
    clientOWM.getPromise('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&lang=fr&APPID=b05787eda8d8f7967925692ea52134d2')
      .catch((error) => {
        throw error
      })
      .then((res) => {
        var weather = 'La température est de ' + res.data.main.temp + '°C'
        weather = weather + ', l\'humidité est de ' + res.data.main.humidity + ' %'
        weather = weather + ', le temps est : ' + res.data.weather[0].description
        msg.channel.sendMessage(weather)
        console.log(res.data)
      })
  } else if (msgTab[0] === 'forecast') {
    messageOWM = ''
    for (var k = 1; k < msgTab.length; k++) {
      messageOWM = messageOWM + ' ' + msgTab[k]
    }

    newMessageOWM = messageOWM.split(', ')

    city = newMessageOWM[0]
    country = newMessageOWM[1]

    clientOWM.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&lang=fr&APPID=b05787eda8d8f7967925692ea52134d2')
      .catch((error) => {
        throw error
      })
      .then((res) => {
        // for (var i = 0; i < res.data.list.length; i++) {
        //   var datebis = res.data.list.dt_txt.split('-')[2]
        //   var jourbis = datebis.split(' ')[0]
        //   if (jourbis === jour + 1) {
        //
        //   }
        //   var weather = 'La température est de ' + res.data.list[i].main.temp + '°C'
        //   weather = weather + ', l\'humidité est de ' + res.data.list[i].main.humidity + ' %'
        //   weather = weather + ', le temps est : ' + res.data.list[i].weather[0].description
        //   msg.channel.sendMessage(weather)
        //   var date = res.data.list.dt_txt.split('-')[2]
        //   var jour = date.split(' ')[0]
        // }
        // var weather = 'La température est de ' + res.data.main.temp + '°C'
        // weather = weather + ', l\'humidité est de ' + res.data.main.humidity + ' %'
        // weather = weather + ', le temps est : ' + res.data.weather[0].description
        // msg.channel.sendMessage(weather)
        console.log(res.data)
      })
  }

  if (msg.content.substring(msg.content, 6) === 'gtrad:') {
    // detection de la langue
    const translate = Translate
    var messaget = msg.content.substring(7)
    translate.detect(messaget)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        msg.channel.sendMessage('Langue:')
        console.log('Langue:')
        detections.forEach((detection) => {
          msg.channel.sendMessage(`${detection.language}`)
          console.log(`${detection.language}`)
        })
      })
      .catch((err) => {
        msg.channel.sendMessage('ERROR - LANGUE NON RECONNUE', err)
      })
    // traduction
    translate.translate(messaget, 'en').then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      msg.channel.sendMessage('Traduction:')
      console.log('Traduction:')
      translations.forEach((translation) => {
        msg.channel.sendMessage(`${messaget} => ${translation}`)
        console.log(`${messaget} => ${translation}`)
      })
    })
    .catch((err) => {
      msg.channel.sendMessage('ERROR', err)
    })
    // traduction langue demandée
    var languedemandee = msg.content.charAt(6) + msg.content.charAt(7)
    console.log(languedemandee)
    translate.translate(messaget, languedemandee).then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      // msg.channel.sendMessage('Traduction:')
      // console.log('Traduction:')
      translations.forEach((translation) => {
        msg.channel.sendMessage(`${messaget} => ${translation}`)
        console.log(`${messaget} => ${translation}`)
      })
    })
    .catch((err) => {
      msg.channel.sendMessage('ERROR - LANGUE ' + languedemandee + ' NON RECONNUE', err)
    })
  }

  spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data.body['access_token'])

    var msgTab = msg.content.split(' ')

    if (msgTab[0] === 'spotify:') {
      var message = ''
      for (var i = 1; i < msgTab.length; i++) {
        message = message + ' ' + msgTab[i]
      }

      spotifyApi.searchTracks(message, 1)
      .then(function (data) {
        console.log('Search tracks by "' + message + '" : ', data.body)
        console.log(data.body.tracks.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat de track pour la recherche " ' + message + '" est :' + data.body.tracks.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })

      spotifyApi.searchArtists(message, 1)
      .then(function (data) {
        console.log('Search artists by "' + message + '" : ', data.body)
        console.log(data.body.artists.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat d\'artiste pour la recherche " ' + message + '" est :' + data.body.artists.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })

      spotifyApi.searchAlbums(message, 1)
      .then(function (data) {
        console.log('Search albums by "' + message + '"  : ', data.body)
        console.log(data.body.albums.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat d\'album pour la recherche " ' + message + '" est :' + data.body.albums.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })
    } else if (msgTab[0] === 'spotify' && msgTab[1] === 'artist:') {
      var messageBis = ''
      for (var j = 2; j < msgTab.length; j++) {
        messageBis = messageBis + ' ' + msgTab[j]
      }
      spotifyApi.searchArtists(messageBis, 1)
      .then(function (data) {
        console.log('Search artists by "' + message + '" : ', data.body)
        console.log(data.body.artists.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat d\'artiste pour la recherche " ' + messageBis + '" est :' + data.body.artists.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })
    } else if (msgTab[0] === 'spotify' && msgTab[1] === 'track:') {
      var messageTer = ''
      for (var k = 2; k < msgTab.length; k++) {
        messageTer = messageTer + ' ' + msgTab[k]
      }
      spotifyApi.searchTracks(messageTer, 1)
      .then(function (data) {
        console.log('Search tracks by "' + message + '" : ', data.body)
        console.log(data.body.tracks.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat de track pour la recherche " ' + messageTer + '" est :' + data.body.tracks.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })
    } else if (msgTab[0] === 'spotify' && msgTab[1] === 'album:') {
      var messageQuart = ''
      for (var l = 2; l < msgTab.length; l++) {
        messageQuart = messageQuart + ' ' + msgTab[l]
      }
      spotifyApi.searchAlbums(messageQuart, 1)
      .then(function (data) {
        console.log('Search albums by "' + message + '"  : ', data.body)
        console.log(data.body.albums.items[0].external_urls.spotify)
        msg.channel.sendMessage('Le meilleur résultat d\'album pour la recherche " ' + messageQuart + '" est :' + data.body.albums.items[0].external_urls.spotify)
      }, function (err) {
        console.error(err)
      })
      .catch(function (e) {
        console.log(e)
      })
    }
  })
 .catch(function (e) {
   console.log(e)
 })
})
client.login(config.token)
