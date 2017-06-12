# Projet d'Architecture des SI  
### Projet réalisé dans le cadre de l'ISEP, école d'ingénieur  

Ce groupe projet comporte les élèves suivants :  
+ Aude De Maricourt
+ Camille Duboué
+ Alizée Faytre
+ Esther Laurette  
  
Ce projet contient un bot lié à l'application Discord, qui réalise les commandes suivantes (les mots entre "[ ]" sont à remplacer et les "[ ]" ne doivent pas apparaitrent dans votre commande) :  
+ Recherche Youtube : 
  - commande à exécuter : "youtube: [votre recherche]"
  - résultat : retourne les 3 résultats les plus populaires pour votre recherche
  - exemple de commande valide : "youtube: Céline Dion"
+ Traduction avec Google Translate :
  - commande à exécuter : "gtrad([langue de traduction désirée]): [phrase à traduire]"
  - résultat : retourne la phrase à traduire en anglais et dans la langue de traduction désirée
  - exemple de commande valide : "gtrad(ru): bonjour, comment ça va ?"
+ Recherche Spotify : 
  - commande à exécuter :
    * "spotify: [votre recherche]"
    * "spotify artist: [votre recherche]"
    * "spotify album: [votre recherche]"
    * "spotify track: [votre recherche]"
  - résultats :
    * pour la recherche simple, le bot retourne 1 track, 1 album, 1 artist
    * pour les autres recherches, le bot retourne le résultat le plus pertinent
  - exemples de commandes valides :
    * "spotify: sous le vent"
    * "spotify artist: Garou"
    * "spotify album: 24K Magic"
    * "spotify track: Despacito"
+ Demande de météo avec OpenWeatherMap : 
  - commande à exécuter :
    * "weather: [ville souhaitée], [pays]"
    * "forecast: [ville souhaitée], [pays]"
  - résultats :
    * pour weather : le bot retourne le temps qu'il fait dans la ville demandée
    * pour forecast : le bot retourne le temps qu'il fera sur 5 jours à l'heure ou la commande est utilisée
  - exemples de commandes valides : 
    * "weather: Paris, fr"
    * "forecast: Paris, fr"
+ Post d'un statut Twitter :
  - commande à exécuter : "tweet: [votre tweet]"
  - résultat : le tweet est posté du compte renseigné par la variable twitterClient dans le fichier bot.js
  - exemple de commande valide : "tweet: il fait trop beau aujourd'hui ! #youpi #été #deBonneHumeur"
+ Le bot vous indique également, dans le channel désigné par channelId dans config.js, les tweets dans lesquels le compte twitterClient est mentionné  
  
les packages node utilisés pour réaliser les appels aux différentes API sont :  
+ google-translate-api
+ node-rest-client-promise
+ spotify-web-api-node
+ twitter
  
  
En espérant que ce bot vous plaira et vous sera d'une grande utilité !
