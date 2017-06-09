const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var promise = require('node-rest-client-promise').Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
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
})

client.login(config.token)
