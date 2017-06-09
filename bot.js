const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

var clientOWM = require('node-rest-client-promise').Client()

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (!config.channels[msg.channel.id] || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }

  var msgTab = msg.content.split(' ')

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
})

client.login(config.token)
