const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var Twitter = require('twitter')

var twitterClient = new Twitter({
  consumer_key: 'GbhsMXiYxEurst8y9iRdTLnXY',
  consumer_secret: 'kjGHlQNEv7BVJZkR27y5y2T4nviQfzq3m4zzKKosmZsw1w4xxk',
  access_token_key: '865505348249047040-Ndur0ufaJrKX9sDWG2AqK6N6Cld54YT',
  access_token_secret: 'OYTFpWH9jXkWndG08XgYkgvmOoCx0f6SHaJ5e8LAMTSq3'
})

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

  if (msgTab[0] === 'tweet:') {
    var message = ''
    for (var i = 1; i < msgTab.length; i++) {
      message = message + ' ' + msgTab[i]
    }

    if (message.length <= 140) {
      twitterClient.post('statuses/update', {status: message}, function (error, tweet, response) {
        if (!error) {
          console.log(response)
        }
      })
    }
  }
})

twitterClient.stream('statuses/filter', {track: 'AlizeeDev'}, function (stream) {
  stream.on('data', function (tweet) {
    console.log(tweet.text)
    // var message = new Discord.Message()
    var channelid = '307411336084586496'
    client.channels.find('id', channelid).sendMessage('You were mention in this tweet : ' +
      'From : ' + tweet.user.name + ' : ' +
      tweet.text)
  })

  stream.on('error', function (error) {
    console.log(error)
  })
})

client.login(config.token)
