# Projet PickMySong

Dans ce projet, nous devions développer un site nous permettant de rechercher des artistes ou des réalisations musicales à l'aide des technologies suivantes :

- Vue.js : Afin d'élaborer le backend
- Axios.js : Qui simplifiera les requêtes ajax
- Bootstrap : Pour permettre de créer un affichage

En ce qui concerne la récupération des informations, nous devions donc utiliser le site https://musicbrainz.org. Cependant, cette API ne comportant pas les images des réalisations musicales, nous avons utilisé https://coverartarchives.org pour récupérer les images pochettes.

Afin de permettre un affichage adapté à l'utilisateur, des icones sont utilisés à l'aide des librairies suivante :
- Semantic UI : Pour les drapeaux
- Font awesome : Pour le reste

## Initialisation du projet

Afin de pouvoir faire fonctionner ce projet, il vous faudra un serveur apache (WAMP,XAMP,LAMP). Si vous le faites tourner en local, vous devrez donc installer une extension pour pouvoir faire des requêtes ajax en cross-origin comme https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi pour google chrome. Il vous faudra donc ajouter les addresses des APIs utilisées dans ce site web à savoir https://musicbrainz.org et https://coverartarchives.org dans "Intercepted URLs or URL patterns".

## Structure du code

Afin de pouvoir être modulable, des components sont utilisés. Ainsi, chaque table de résultat représente un component.
Pour que le code soit plus structuré et que l'on puisse mieux s'y retrouver, le html est séparé du fichier contenant les components et du fichier contenant l'instance de Vuejs.

## Documentation

Pour pouvoir être compréhensible, chaque fonction est commenté. De même, le type de chaque variable est précisé ainsi que l'usage de ces dernières.

## Visuels du site web (création avec wireframe.cc)

![Visuel resultats](./img/resultats.png)
![Visuel details album](./img/albumdetails.png)