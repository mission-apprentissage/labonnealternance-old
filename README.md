![](https://avatars1.githubusercontent.com/u/63645182?s=200&v=4)

# Template Apprentissage

## Pré-requis

- NodeJs 12.11
- Yarn
- Docker & Docker-compose

## Présentation

Ce template permets de créer la structure d'une application exemple selon 4 modèles différents :

- `express` pour un modèle d'application de type API Node Express
- `express-mongo` pour un modèle d'application de type API Node Express avec une base de données MongoDb
- `express-mongo-ui` pour un modèle d'application de type API Node Express avec une base de données MongoDb et une UI en React
- `express-mongo-ui-elastic` pour un modèle d'application de type API Node Express avec une base de données MongoDb et une UI en React et un moteur de recherche ElasticSearch attaché

Chacun de ces modèles est accessible via une branche dédiée du répository.

## Infrastructure & Déploiement

Ce template fonctionne de manière autonome en local avec des conteneurs docker.

Pour déployer et faire fonctionner l'application sur un server dédié dans Azure il faut récupérer le contenu du répository template-apprentissage-infra pour le modèle choisi.

Le répository template-apprentissage-infra est lui, privé car il est utilisé pour contenir l'ensemble des données sensibles (Clés SSH, mots de passes ...) nécessaires à la mise en place de votre application, merci de suivre sa documentation dédiée pour déployer votre application.

## Organisation des dossiers

_TODO UPDATE_
Ce template est organisé de la manière suivante :

```
    |-- .github
    |-- reverse_proxy
        |-- app
            |-- logrotate.d
                |-- logrotate.conf
            |-- nginx
                |-- conf.d
                  |-- locations
                    |-- api.inc
                  |-- default.conf
                |-- nginx.conf
            |-- start.sh
        |-- Dockerfile
    |-- server
        |-- assets
        |-- config
          |-- custom-environment-variables.json
          |-- default.json
        |-- data
        |-- src
        |-- tests
          |-- integration
            |-- ...
          |-- unit
            |-- ...
          |-- utils
            |-- ...
    |-- .gitattributes
    |-- .gitignore
    |-- docker-compose.yml
    |-- docker-compose.override.yml

```

- Le dossier `/.github` va contenir l'ensemble des Github Actions.
- Le dossier `/reverse_proxy` va contenir le serveur Nginx et sa configuration en tant que reverse_proxy.
- Le dossier `/server` va contenir l'ensemble de l'application coté serveur, à savoir l'API Node Express.
- Le fichier `/docker-compose.yml` va définir la configuration des conteneurs de l'application, _pour plus d'informations sur Docker cf: https://docs.docker.com/_
- Le fichier `/docker-compose.override.yml` va définir la configuration Docker spécifique à l'environnement local de développement.

## Gestion de la configuration

La gestion de configuration et de variables d'environnement est mise en place avec la librairie node-config : https://www.npmjs.com/package/config

La configuration est définie dans le dossier `/server/config` et on y trouve :

- Un fichier `/server/config/custom-environment-variables.json` qui va définir la liste des variables d'environnements pour l'application
- Un fichier `/server/config/default.json` qui va définir la valeur par défaut de ces variables d'environnement.

Ensuite dans la définition des conteneurs Docker ces variables d'environnements seront écrasées au besoin.

## Personnalisation du template

### Nom de l'application

Avant de démarrer il convient de modifier le nom de l'application souhaitée dans l'ensemble des fichiers concernés.

Il vous faudra donc remplacer le nom **`template-app`** par le nom de votre application dans les fichiers de configuration suivants :

### Noms des conteneurs Docker

Il vous faudra remplacer les noms des conteneurs Docker et des volumes (ou network) `template_app_<conteneur>` ou `template_app_<volume>` par `<nom_application>_<conteneur>` ou `<nom_application>_<volume>` dans les 2 fichiers de configuration Docker-compose :

- `/docker-compose.yml`
- `/docker-compose.override.yml`

### Paramètres d'environnement

Il vous faudra ensuite remplacer les noms de variables d'env `TEMPLATE_APP_<parametre>` par `<nom_application>_<parametre>` dans la définition de la configuration dans :

- `/server/config/custom-environment-variables.json`
- `/server/config/default.json`

Il faudra ensuite mettre à jour dans la configuration Docker-compose ces variables dans :

- `/docker-compose.yml`
- `/docker-compose.override.yml`

Il faudra ensuite mettre à jour dans la configuration (`/server/config/default.json`) et dans le Docker-compose le nom de la base de données mongo en remplaçant :

```
TEMPLATE_APP_MONGODB_URI=mongodb://mongodb:27017/template-app?retryWrites=true&w=majority
```

par

```
<nom_application>_MONGODB_URI=mongodb://mongodb:27017/<nom-application>?retryWrites=true&w=majority
```

### Package.json

Il faudra aussi modifier dans le fichier `/server/package.json` les valeurs :

- name : `mna-<nom_app>`
- description : `[MNA] <Nom Application>`
- repository : `https://github.com/mission-apprentissage/<nom_repository>.git`

### Tests unitaires

Dans la partie tests unitaires de l'application il est aussi nécessaire de modifier le nom de la base de données de tests, dans `/server/tests/utils/testUtils.js` :

```javascript
const uri = config.mongodb.uri.split("template-app").join("template-app_test");
```

## Conteneurs Docker

### Présentation de la configuration Docker

Pour fonctionner ce template a besoin des éléments dockérisés suivants :

- Un serveur Web Nginx jouant le role de reverse proxy, _défini dans le service `reverse_proxy` du docker-compose_.
- Un serveur Node Express, _défini dans le service `server` du docker-compose_.
- Un réseau _défini dans `template_app_network` du docker-compose_.
- Une base de donnée mongoDb _défini dans le service `mongodb` du docker-compose_.
- Un moteur de recherche elasticsearch _défini dans le service `elasticsearch` du docker-compose_.
- Un portail kibana pour elasticsearch _défini dans le service `kibana` du docker-compose_.

### Serveur Nodes & Nginx - Reverse Proxy

Le serveur nginx joue le role de reverse proxy sur le port 80.

Le serveur Web Node Express utilise le port 5000.

Dans la configuration de nginx, on fait référence au fichier `/reverse_proxy/app/nginx/conf.d/locations/api.inc` qui définir la gestion de l'API Node Express.
Dans la configuration de nginx, on fait référence au fichier `/reverse_proxy/app/nginx/conf.d/locations/ui.inc` qui définir la gestion de l'UI React.
Dans la configuration de nginx, on fait référence au fichier `/reverse_proxy/app/nginx/conf.d/locations/es.inc` qui définir la gestion d'Elasticsearch.
Dans la configuration de nginx, on fait référence au fichier `/reverse_proxy/app/nginx/conf.d/locations/kibana.inc` qui définir la gestion de Kibana.

### Base de données MongoDb

Le base de données est une MongoDb et utilise le port par défaut 27017.

### Elasticsearch & Kibana

Le moteur de recherche elasticsearch est défini par défaut dans le fichier `./elasticsearch/elasticsearch.yml` et utilise le port 9200 en local.

Pour y accéder :

```bash
http://localhost/es
```

Le portail kibana est défini par défaut dans le fichier `./elasticsearch/kibana.yml` et utilise le port 5601 en local.

Pour y accéder :

```bash
http://localhost/kibana
```

### Démarrage de la stack

Pour créer la stack et monter l'environnement il suffit de lancer la commande suivante depuis le répertoire `/server` :

```bash
yarn docker:start
```

### Arret de la stack

Il est possible de stopper les conteneur en lancant la commande suivante depuis le répertoire `/server` :

```bash
yarn docker:stop
```

### Suppression de la stack

Pour supprimer l'ensemble de la stack et tuer tous les conteneurs il suffit de lancer la commande suivante depuis le répertoire `/server` :

```bash
yarn docker:clean
```

### Vérification du montage de la stack

Aprés avoir créé la stack pour vérifier que les conteneurs sont bien présents vous pouvez lancer la commande suivante depuis le répertoire `/server` :

```bash
docker exec -t -i template_app_server /bin/bash
```

De même pour consulter la liste des fichiers dans le docker :

```bash
docker exec template_app_server bash -c 'ls'
```

## Linter

Un linter (via ESLint) est mis en place dans le projet, pour le lancer :

```bash
yarn lint
```

## Tests

Des tests sont mis en place en utilisant le framework Mocha.

_Pour en savoir plus sur Mocha : https://mochajs.org/_

Les tests sont en règle général découpés en 3 dossiers :

- Le dossier `/server/tests/unit` contient la liste des tests unitaires.
- Le dossier `/server/tests/integration` contient la liste des tests d'intégration
- Le dossier `/server/tests/utils` contient la liste des utilitaires communs de test.

## Server Node Express

### Http

La structure principale du serveur Node Express est définie dans `/server/src/http` et contient :

- La liste des middlewares express à appliquer
- La liste des routes d'API
- Le point d'entrée principal du serveur : `/server/src/http/server.js`

Il est possible de tester en local le server express via `http://localhost/api`

### Logger

Pour la gestion des logs nous utilisons la librairie bunyan _cf : https://www.npmjs.com/package/bunyan_

Par défaut 3 stream sont configurés :

- Dans la console.
- Dans un fichier JSON.
- Dans une chaine Slack.
- TODO Mongo

Pour mettre en place les notifications Slack il est nécessaire d'utiliser les Webhooks et de créer une chaine dédiée dans votre espace de travail Slack.

Il vous faudra créer une application dans Slack et récupérer le lien de la Webhook, pour en savoir plus : https://api.slack.com/messaging/webhooks.

### Utilitaires

Certains modules utilitaires sont présents dans `/server/src/common/utils`

### Composants injectables

Un module permettant de contenir des composants "communs" et injectable dans les routes est proposé dans le fichier `/server/src/common/components/components.js`

Vous pouvez ajouter dans ce fichier des élements communs à réexploiter dans l'API.

## Mongoose & Mongoostatic

_TODO SBS UPDATE_

## Debugger sous VSCode

Il est possible de débugger facilement le serveur Express contenu dans le Docker local **sous VSCode** en utilisant la configuration suivante \_a placer dans le fichier `/.vscode/launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug Express in docker",
      "address": "127.0.0.1",
      "port": 9229,
      "localRoot": "${workspaceFolder}/server/src",
      "remoteRoot": "/app/src",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Cette configuration va utiliser la commande `debug` définie dans le fichier `/server/package.json` :

```json
{
  "scripts": {
    "debug": "nodemon --inspect=0.0.0.0 --signal SIGINT --ignore tests/ src/index.js"
  }
}
```

## Workflows & CI / CD

Dans le repertoire `/.github/workflows` sont définie les Github actions à mettre en place sur le repository.

Le workflow principal est définie dans `/.github/workflows/yarn-ci.yml` et se charge à chaque push sur une branche de :

- Vérifier l'installation des dépendances
- Lancer le linter
- Exécuter les tests unitaires.
