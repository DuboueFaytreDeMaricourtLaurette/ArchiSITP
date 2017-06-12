const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

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
  // console.log(msg.content.substring(msg.content, 6))
  if (msg.content.substring(msg.content, 5) === 'gtrad') {
    // detection de la langue
    const translate = Translate
    var message = msg.content.substring(11) // 7+3+2 (gtrad(fr): ...)
    translate.detect(message)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        msg.channel.sendMessage('Langue:')
        console.log('Langue:')
        detections.forEach((detection) => {
          msg.channel.sendMessage(`${detection.language}`)
          // console.log(`${detection.language}`)
        })
      })
      .catch((err) => {
        msg.channel.sendMessage('ERROR - LANGUE NON RECONNUE', err)
      })
    // traduction anglais
    translate.translate(message, 'en').then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      msg.channel.sendMessage('Traduction:')
      console.log('Traduction:')
      translations.forEach((translation) => {
        msg.channel.sendMessage(`${message} => ${translation}`)
        console.log(`${message} => ${translation}`)
      })
    })
    .catch((err) => {
      msg.channel.sendMessage('ERROR', err)
    })
    // traduction langue demandée
    var languedemandee = msg.content.charAt(6) + msg.content.charAt(7)
    console.log(languedemandee)
    translate.translate(message, languedemandee).then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      // msg.channel.sendMessage('Traduction:')
      // console.log('Traduction:')
      translations.forEach((translation) => {
        msg.channel.sendMessage(`${message} => ${translation}`)
        console.log(`${message} => ${translation}`)
      })
    })
    .catch((err) => {
      msg.channel.sendMessage('ERROR - LANGUE ' + languedemandee + ' NON RECONNUE', err)
    })
  }
})
client.login(config.token)
