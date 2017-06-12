const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var promise = require('node-rest-client-promise').Client()
var Translate = require('@google-cloud/translate')({
  key: 'AIzaSyBngKK7gcXWaJVV3SmCZ40UmxFWCljOQx8'
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
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
})
client.login(config.token)
