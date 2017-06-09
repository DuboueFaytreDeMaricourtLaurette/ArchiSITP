const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'c85d72908393430b8a3d191303a44cb8',
  clientSecret: '044eaee7b5144caebaafc1b370f31828'
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
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
  }
)
.catch(function (e) {
  console.log(e)
})
})

client.login(config.token)
