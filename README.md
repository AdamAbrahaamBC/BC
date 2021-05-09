# Projekt vyžaduje spúštacie prostredie [Node.js](https://nodejs.org)

## Server
``` bash
# nutný je prechod do repozitára servera z monorepozitára!!
$ cd server

# inštalácia balíkov
$ npm ci

# build servera
$ npm run build

# spustenie servera na localhost:3000
$ npm run start

# spustenie vývojového prostredia cez nodemon (IBA PRE VÝVOJ!)
$ npm run dev
```


Pri spustení projektu z pamäťového média, ktoré už obsahuje build, stačí ***npm run start***.

## Klient
``` bash
# nutný je prechod do repozitára klienta z monorepozitára!!
$ cd client

# inštalácia balíkov
$ npm ci

# build servera
$ npm run build

# spustenie servera na localhost:3000
$ npm run start

# spustenie vývojového prostredia s hot-reload (IBA PRE VÝVOJ!)
$ npm run dev
```

Pri spustení projektu z pamäťového média, ktoré už obsahuje build, stačí ***npm run start***.

## Cypress E2E testy
``` bash
# nutný je prechod do repozitára klienta z monorepozitára!!
$ cd client

# spustenie Cypress UI
$ npx cypress open

# spustenie testov v terminály
$ npx cypress run
```
