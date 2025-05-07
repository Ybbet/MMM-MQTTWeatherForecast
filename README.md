# MMM-MQTTWeatherForecast

**MMM-MQTTWeatherForecast** est un module pour [MagicMirror²](https://magicmirror.builders/) qui affiche les prévisions météo sur plusieurs jours à partir de données publiées via MQTT (par exemple depuis Home Assistant).

Ce module permet de consulter dans un tableau clair :

* Le jour de la prévision
* La température maximale
* La température minimale
* Une icône représentant l’état du ciel (ensoleillé, nuageux, etc.)

## Fonctionnalités

* Connexion à un broker MQTT avec support de l’authentification (login / mot de passe)
* Affichage des prévisions sur plusieurs jours (5 par défaut)
* Icônes météo personnalisées en fonction des conditions
* Compatible avec les données issues de `homeassistant.weather.*`

## Exemple de configuration

```js
{
  module: "MMM-MQTTWeatherForecast",
  position: "top_right",
  config: {
    mqttServer: "mqtt://192.168.1.100",
    mqttUsername: "ton_login",
    mqttPassword: "ton_mot_de_passe",
    topicBase: "homeassistant/weather/maville/forecast/",
    days: 5
  }
}
```

## Exemple de topics attendus

Pour chaque jour (de 0 à 4), le module s’abonne aux topics suivants :

```
homeassistant/weather/maville/forecast/0/datetime
homeassistant/weather/maville/forecast/0/temperature
homeassistant/weather/maville/forecast/0/templow
homeassistant/weather/maville/forecast/0/condition
...
homeassistant/weather/maville/forecast/4/condition
```

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/ton-utilisateur/MMM-MQTTWeatherForecast.git
cd MMM-MQTTWeatherForecast
npm install
```
