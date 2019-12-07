# Hello node redis

## Présentation

Voir le slideshow de ce hands-on : [Training Docker](https://docs.google.com/presentation/d/1A4rlevikNsYDhvkTbsBHLzdaFqyrhqcBvWn3IrC19LA)

## Objectifs

- Faire une application RESTful (API) de compteur de visites
- GET / retourne le compteur
- POST / incrémente le compteur

## Consignes / aide

- Utiliser les modules NPM express et ioredis
- Coder l'application
- Créer un réseau commun aux 2 conteneurs (l'app et la base redis) :

  ```
  $ docker network create hello-network
  ```

- Démarrer la base redis :

  ```
  $ docker run --name redis-server --net hello-network --restart unless-stopped -d -p 6379:6379 redis:5.0-alpine
  ```

- Construire le conteneur de l'app :

  ```
  $ docker build -t openhoat/hello-node-redis .
  ```

- Démarrer l'app en lui permettant de se connecter à la base redis :

  ```
  $ docker run --name hello-node-redis --net hello-network -e REDIS_HOST=redis-server --rm -p 3000:3000 openhoat/hello-node-redis
  ```
