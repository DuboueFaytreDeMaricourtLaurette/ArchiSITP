# Projet d'Architecture des SI  
### Projet réalisé dans le cadre de l'ISEP, école d'ingénieur  

Ce groupe projet comporte les élèves suivants :  
+ Aude De Maricourt
+ Camille Duboué
+ Alizée Faytre
+ Esther Laurette  
  
Ce projet contient un bot lié à l'application Discord, qui réalise les commandes suivantes (les mots entre "[]" sont à remplacer et les "[]" ne doivent pas apparaitrent dans votre commande) :  
+ Recherche Youtube : 
  - commande à exécuter : "youtube: [votre recherche]"
  - résultat : retourne les 3 résultats les plus populaire pour votre recherche
  - exemple de commande valide : "youtube: Céline Dion"
+ Traduction avec Google Translate :
  - commande à exécuter : "gtrad([langue de traduction désirée]): [phrase à traduire]"
  - résultat : retourne le phrase à traduire en anglais et dans la langue de traduction désirée
  - exemple de commande valide : "gtrad(ru): bonjour, comment ça va ?"
+ Recherche Spotify : 
  - commande à exécuter :
    * "spotify: [votre recherche]"
    * "spotify artist: [votre recherche]"
    * "spotify album: [votre recherche]"
    * "spotify track: [votre recherche]"
  - résultats :
    * pour la recherche simple, le bot retourne 1 track, 1 album, 1 artist
    * pour les autres recherche, le bot retourne le résultat le plus pertinent
  - exemples de commandes valides :
    * "spotify: sous le vent"
    * "spotify artist: Garou"
    * "spotify album: 24K Magic"
    * "spotify track: Despacito"
+ Post d'un status Twitter :
  - commande à exécuter : "tweet: [votre tweet]"
  - résultat : le tweet est posté du compte renseigné par la variable twitterClient dans le fichier bot.js
  - exemple de commande valide : "tweet: il fait trop beau aujourd'hui ! #youpi #été #deBonneHumeure"
+ Le bot vous indique également, dans le channel désigné par channelId dans config.js, les tweets dans lesquels le compte twitterClient est mentionné  
  
  
En espérant que ce bot vous plaira et vous sera d'une grande utilité !
